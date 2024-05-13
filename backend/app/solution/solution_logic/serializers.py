from django.db.models import Sum
from django.db.models.query import QuerySet
from rest_framework import serializers
from solution.solutions.models import Solution
from utils import generate_aggregate

from .models import DashboardGroup, DashboardItem, ImpactDetail


class DashboardGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = DashboardGroup
        fields = "__all__"


class DashboardItemSerializer(serializers.ModelSerializer):
    group = DashboardGroupSerializer()
    altered_amout = serializers.SerializerMethodField()

    def get_altered_amout(self, instance: DashboardItem) -> int:
        impact_details = self.get_impact_details(instance)
        return generate_aggregate(impact_details, Sum("amount"))

    class Meta:
        model = DashboardItem
        fields = "__all__"

    def get_impact_details(self, instance: DashboardItem) -> QuerySet[ImpactDetail]:
        """Retrieve impact details related to a specific instance.

        This method calculates a combined queryset of impact details of the selected
        solutins where the dashboard_item matches the provided instance.
        """
        impact_details = ImpactDetail.objects.none()

        selected_solutions = self.get_selected_solutions()
        for solution in selected_solutions:
            impact_details |= solution.solution_logic.impact_detail.filter(
                dashboard_item=instance
            )

        return impact_details

    def get_selected_solutions(self) -> QuerySet[Solution]:
        current_user = self.context["request"].user
        if current_user.is_authenticated:
            return current_user.user_selections.selected_solutions.all()
        return Solution.objects.none()
