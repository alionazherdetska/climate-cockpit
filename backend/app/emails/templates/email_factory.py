import datetime
import os

from emails.models import Email


class EmailFactory:
    ORGANIZATION_NAME = os.environ.get("ORGANIZATION_NAME", "")
    DOMAIN = os.environ.get("DOMAIN", "")
    FOOTER = (
        f"© {datetime.datetime.now(tz=datetime.UTC).year} "
        f"{ORGANIZATION_NAME}\n"
        f"{DOMAIN}\n"
        "All rights reserved."
    )

    @classmethod
    def _create(cls, subject, content):
        return Email(subject=subject, content=content, footer=cls.FOOTER)

    @classmethod
    def create_registration_confirmation(cls, code):
        subject = "Registration Confirmation"
        content = (
            f"Dear user,\n\n"
            "Thank you for registering on our platform. "
            "To complete your registration, "
            f"please use the validation code: {code}.\n\n"
            "Enter this code on our website to activate your account.\n\n"
            "If you did not initiate this registration, please ignore this email."
        )
        return cls._create(subject, content)

    @classmethod
    def create_password_reset_request(cls, code):
        subject = "Password Reset Request"
        content = (
            f"Dear user,\n\n"
            "You have requested a password reset. "
            f"Your password reset code is: {code}.\n\n"
            "Please use this code to reset your password."
        )
        return cls._create(subject, content)
