import csv
from pathlib import Path

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

User = get_user_model()


class Command(BaseCommand):
    help = "Create a GPTbot user in the database"  # noqa: A003

    def handle(self, *args, **options):
        source_root = Path(__file__).parent / "source"
        csv_file_path = source_root / "gptbot_users.csv"
        with Path.open(csv_file_path, encoding="utf-8") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                username = row["username"]
                if User.objects.filter(email=row["email"]).exists():
                    self.stdout.write(
                        self.style.WARNING(f"AI user already exists: {username}")
                    )
                else:
                    User.objects.create_user(**row)
                    self.stdout.write(
                        self.style.SUCCESS(f"AI user created: {username}")
                    )
