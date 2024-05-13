import csv
import json
from pathlib import Path

from django.core.management.base import BaseCommand
from rest_framework.generics import get_object_or_404
from solution.solution_logic.models import (
    DashboardGroup,
    DashboardItem,
    ImpactDetail,
    SelectionRule,
    SolutionLogic,
)
from solution.solutions.models import Category, Resource, Solution

source_root = Path("solution/management/commands/source")


class Command(BaseCommand):
    help = "Import solution data from CSV files."  # noqa: A003

    def handle(self, *args, **options):
        populate_solutions()
        self.stdout.write(self.style.SUCCESS("Successfully imported solution data"))

        populate_resources()
        self.stdout.write(self.style.SUCCESS("Successfully imported resources"))

        populate_dashboard_items()
        self.stdout.write(self.style.SUCCESS("Successfully imported dashboard_items"))

        populate_solution_logics()
        self.stdout.write(self.style.SUCCESS("Successfully imported solution_logics"))


def populate_solutions():
    csv_file_path = source_root / "solution_content.csv"
    with Path.open(csv_file_path, encoding="utf-8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data = dict(**row)
            data["category"], _ = Category.objects.get_or_create(name=data["category"])

            for field_name in row:
                if data[field_name] is None or data[field_name] == "":
                    del data[field_name]

            Solution.objects.create(**data)


def populate_resources():
    resources_types = ["videos", "news"]
    for resources_type in resources_types:
        csv_file_path = source_root / f"resource/{resources_type}.csv"
        with Path.open(csv_file_path, encoding="utf-8") as csv_file:
            csv_reader = csv.DictReader(csv_file)
            for row in csv_reader:
                data = dict(**row)
                for field_name in row:
                    if data[field_name] is None:
                        del data[field_name]

                data["solution"] = get_object_or_404(Solution, name=data["solution"])
                data["resource_type"] = resources_type
                Resource.objects.create(**data)


def populate_dashboard_items():
    fields = [field.name for field in DashboardItem._meta.get_fields()]  # noqa: SLF001

    csv_file_path = source_root / "dashboard_item.csv"
    with Path.open(csv_file_path, encoding="utf-8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data = dict(**row)

            data["group"], _ = DashboardGroup.objects.get_or_create(
                name=data["group"], subgroup_name=data["subgroup"]
            )

            for field_name in row:
                if data[field_name] is None or field_name not in fields:
                    del data[field_name]
            DashboardItem.objects.create(**data)


def populate_solution_logics():
    csv_file_path = source_root / "solution_logic.csv"
    with Path.open(csv_file_path, encoding="utf-8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data = dict(**row)
            for field_name in row:
                if not data[field_name] or field_name == "impact_detail":
                    del data[field_name]

            data["solution"] = get_object_or_404(Solution, name=data["solution"])
            data["selection_rule"], _ = SelectionRule.objects.get_or_create(
                description=data["selection_rule"]
            )
            solution_logic = SolutionLogic.objects.create(**data)

            if row["impact_detail"]:
                impact_details = json.loads(row["impact_detail"])
                for group_name, amount in impact_details.items():
                    dashboard_item = DashboardItem.objects.get(name=group_name)
                    impact_detail, _ = ImpactDetail.objects.get_or_create(
                        dashboard_item=dashboard_item, amount=amount
                    )
                    solution_logic.impact_detail.add(impact_detail)
