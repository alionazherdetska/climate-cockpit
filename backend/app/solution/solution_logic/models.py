from django.db import models
from django_extensions.db.models import TimeStampedModel
from solution.solutions.models import Solution


class SelectionRule(models.Model):
    description = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.description


class DashboardGroup(models.Model):
    name = models.CharField(max_length=100)
    subgroup_name = models.CharField(max_length=100)

    class Meta:
        unique_together = ["name", "subgroup_name"]

    def __str__(self):
        return f"{self.name} - {self.subgroup_name}"


class DashboardItem(TimeStampedModel):
    class AlteredTypeChoices(models.TextChoices):
        REDUCTION = "reduction", "reduction"
        ADDITION = "addition", "addition"

    name = models.CharField(max_length=100, unique=True)
    initial_amount = models.IntegerField()
    altered_type = models.CharField(
        max_length=20,
        choices=AlteredTypeChoices.choices,
        help_text=f"Select from {AlteredTypeChoices.labels}",
        blank=True,
    )

    group = models.ForeignKey(
        DashboardGroup, models.PROTECT, related_name="dashboard_icons"
    )
    icon_name_initial = models.CharField(max_length=255, blank=True)
    icon_name_altered = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"[{self.group}] {self.name}"


class ImpactDetail(models.Model):
    dashboard_item = models.ForeignKey(
        DashboardItem, models.PROTECT, related_name="impact_detail"
    )
    amount = models.IntegerField()

    class Meta:
        unique_together = ["dashboard_item", "amount"]

    def __str__(self):
        return f"{self.dashboard_item.name}: {self.amount}"


class SolutionLogic(models.Model):
    solution = models.OneToOneField(
        Solution, models.CASCADE, related_name="solution_logic"
    )
    selection_rule = models.ForeignKey(
        SelectionRule, models.PROTECT, related_name="solution_logics"
    )
    impact_detail = models.ManyToManyField(
        ImpactDetail, related_name="solution_logic", blank=True
    )

    def __str__(self):
        return f"Solution logic for {self.solution.name}"
