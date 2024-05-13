import time

from django.core.management.base import BaseCommand
from emails.models import Email


class Command(BaseCommand):
    """Send unsent emails."""

    def handle(self, *args, **options):
        while True:
            time.sleep(5)

            emails = Email.objects.filter(is_sent=False)
            for email in emails:
                email.send()
