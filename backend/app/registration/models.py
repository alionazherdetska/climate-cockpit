from django.contrib.auth import get_user_model
from django.db import models
from django_extensions.db.models import TimeStampedModel
from utils import code_generator

User = get_user_model()


class Registration(TimeStampedModel):
    """Model for registration profiles.

    Attributes
    ----------
    - user (User): The related user.
    - code (str): Random code used for registration and password reset.
    - code_type (TypeChoices): Type of the code
    - code_used (bool): Indicates if the code has been used.
    """

    class TypeChoices(models.TextChoices):
        REGISTRATION_VALIDATION = "RV", "Registration Validation"
        PASSWORD_RESET = "PR", "Password Reset"

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="registration"
    )
    code = models.CharField(max_length=15, default=code_generator)
    code_type = models.CharField(
        max_length=2,
        choices=TypeChoices.choices,
        default=TypeChoices.REGISTRATION_VALIDATION,
    )
    code_used = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email}: {self.code}"
