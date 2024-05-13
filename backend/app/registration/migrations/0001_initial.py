# Generated by Django 4.2.7 on 2023-11-03 11:05

import django_extensions.db.fields
import utils
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Registration",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    django_extensions.db.fields.CreationDateTimeField(
                        auto_now_add=True, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    django_extensions.db.fields.ModificationDateTimeField(
                        auto_now=True, verbose_name="modified"
                    ),
                ),
                ("code", models.CharField(default=utils.code_generator, max_length=15)),
                (
                    "code_type",
                    models.CharField(
                        choices=[
                            ("RV", "Registration Validation"),
                            ("PR", "Password Reset"),
                        ],
                        default="RV",
                        max_length=2,
                    ),
                ),
                ("code_used", models.BooleanField(default=False)),
            ],
            options={
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
    ]