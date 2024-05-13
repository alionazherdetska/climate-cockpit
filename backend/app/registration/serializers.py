from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from emails.templates.email_factory import EmailFactory
from registration.models import Registration
from registration.signals import (
    post_user_password_reset_validation,
    post_user_registration_validation,
)
from rest_framework import serializers
from utils import code_generator

User = get_user_model()


def validate_email_does_not_exist(email):
    if User.objects.filter(email=email).exists():
        message = "This email is taken"
        raise ValidationError(message)
    return email


def validate_email_exists(email):
    if not User.objects.filter(email=email).exists():
        message = "User does not exist!"
        raise ValidationError(message)
    return email


def validate_username_does_not_exist(username):
    if User.objects.filter(username=username).exists():
        message = "This username is taken"
        raise ValidationError(message)
    return username


def validate_code(code):
    try:
        reg_profile = Registration.objects.get(code=code)
    except Registration.DoesNotExist as err:
        message = "This code is not valid!"
        raise ValidationError(message) from err
    if reg_profile.code_used:
        message = "This code has already been used!"
        raise ValidationError(message)
    return code


def validate_code_and_email(data):
    user = User.objects.get(email=data["email"])
    reg_profile = Registration.objects.get(code=data["code"])
    if reg_profile != user.registration:
        raise ValidationError({"code": ["The code does not belong to this email."]})


def validate_password_match(data):
    if data["password"] != data["password_repeat"]:
        raise ValidationError({"password": ["Passwords do not match!"]})


class RegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[validate_email_does_not_exist])

    def save(self):
        email = self.validated_data["email"]
        new_user = User(username=email, email=email, is_active=False)
        new_user.save()

        profile = Registration(
            user=new_user, code_type=Registration.TypeChoices.REGISTRATION_VALIDATION
        )
        profile.save()

        notification_email = EmailFactory.create_registration_confirmation(profile.code)
        notification_email.to = email
        notification_email.save(request=self.context["request"])
        return new_user


class RegistrationValidationSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[validate_email_exists])
    username = serializers.CharField(validators=[validate_username_does_not_exist])
    code = serializers.CharField(
        label="Validation code", write_only=True, validators=[validate_code]
    )
    password = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    def validate(self, data):
        validate_code_and_email(data)
        validate_password_match(data)
        return data

    def save(self):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)
        user.username = self.validated_data["username"]
        user.set_password(self.validated_data["password"])
        user.is_active = True
        user.registration.code_used = True
        user.save()
        user.registration.save()
        post_user_registration_validation.send(sender=User, user=user)
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(validators=[validate_email_exists])

    def send_password_reset_email(self):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)

        profile = user.registration
        profile.code = code_generator()
        profile.code_used = False
        profile.code_type = Registration.TypeChoices.PASSWORD_RESET
        profile.save()

        notification_email = EmailFactory.create_password_reset_request(profile.code)
        notification_email.to = email
        notification_email.save(request=self.context["request"])


class PasswordResetValidationSerializer(serializers.Serializer):
    code = serializers.CharField(
        label="Validation code", write_only=True, validators=[validate_code]
    )
    email = serializers.EmailField(validators=[validate_email_exists])
    password = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    def validate(self, data):
        validate_code_and_email(data)
        validate_password_match(data)
        return data

    def save(self):
        code = self.validated_data["code"]
        user = Registration.objects.get(code=code).user
        user.set_password(self.validated_data["password"])
        user.registration.code_used = True
        user.save()
        user.registration.save()
        post_user_password_reset_validation.send(sender=User, user=user)
        return user
