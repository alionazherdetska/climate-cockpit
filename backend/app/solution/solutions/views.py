from __future__ import annotations

from typing import TYPE_CHECKING

from django.contrib.auth import get_user_model
from django.db.models import Q
from rest_framework import status
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.generics import (
    GenericAPIView,
    ListAPIView,
    RetrieveAPIView,
    get_object_or_404,
)
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from solution.solution_logic.models import SelectionRule

from .models import Category, Resource, Solution, UserSelection
from .serializers import (
    CategoryNameSerializer,
    ResourceSerializer,
    ScorecardSerializer,
    SolutionSerializer,
    UserSelectionSerializer,
)

if TYPE_CHECKING:
    from django.db.models.query import QuerySet


User = get_user_model()


class CategorySearchFilter(SearchFilter):
    search_param = "category"
    search_description = "Category name"


class ListSolutionAPIView(ListAPIView):
    """get: List all solutions.

    List all solutions.
    You can also apply filter and sorting to customize the results. For example,
    - To filter the solutions by category buildings: /solutions/?category=buildings
    - To list solutions sorted by name alphabetically: /solutions/?ordering=name
    - To list solutions sorted by impact in descending order: \
        /solutions/?ordering=-impact
    """

    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    filter_backends = [CategorySearchFilter, OrderingFilter]
    search_fields = ["=category__name"]
    ordering = ["id"]
    permission_classes = []


class RetrieveSolutionAPIView(RetrieveAPIView):
    """get: Retrieve a solution.

    Retrieve a solution by solution ID.
    """

    queryset = Solution.objects.all()
    serializer_class = SolutionSerializer
    lookup_url_kwarg = "solution_id"
    permission_classes = []


class ListScorecardAPIView(ListAPIView):
    """get: Retrieve the scorecard of an user.

    Retrieve the scorecard of an user by user ID.
    """

    queryset = Category.objects.all().order_by("id")
    serializer_class = ScorecardSerializer
    permission_classes = []
    lookup_url_kwarg = "user_id"

    def get_serializer(self, *args, **kwargs):
        user_id = self.kwargs.get(self.lookup_url_kwarg)
        try:
            user = User.objects.get(id=user_id)
            kwargs["context"] = {"user": user}
        except User.DoesNotExist:
            pass
        return super().get_serializer(*args, **kwargs)


class ListCategoryAPIView(ListAPIView):
    """get: List the category names.

    List the category names.
    """

    queryset = Category.objects.all().order_by("id")
    serializer_class = CategoryNameSerializer
    permission_classes = []


class ResourceTypeSearchFilter(SearchFilter):
    search_param = "type"
    search_description = f"Select from {Resource.TypeChoices.labels}"


class ListResourceAPIView(ListAPIView):
    """get: List all resources belonged to a solution.

    List all resources belonged to a solution by solution ID.
    You can also apply filter to customize the results. For example,
    - To filter the resources by resources type news: \
        /resources/<solution_id>/?type=news
    """

    serializer_class = ResourceSerializer
    lookup_url_kwarg = "solution_id"
    filter_backends = [ResourceTypeSearchFilter]
    search_fields = ["=resource_type"]
    permission_classes = []

    def get_queryset(self):
        solution_id = self.kwargs.get(self.lookup_url_kwarg)
        target_solution = get_object_or_404(Solution, id=solution_id)
        return Resource.objects.filter(solution=target_solution).order_by("id")


class ToggleSelectSolution(GenericAPIView):
    """Toggle select a solution.

    Toggle select a solution for the logged-in user by solution ID.
    """

    queryset = Solution.objects.all()
    lookup_url_kwarg = "solution_id"
    serializer_class = UserSelectionSerializer

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.selection_rules = {
            "exclusive": self.get_selection_rule(
                "If selected, others solutions in category are deselected"
            ),
            "no_car": self.get_selection_rule('If selected, "No Car" is deselected'),
            "electric_car": self.get_selection_rule(
                'If selected, "Electric Car" is deselected'
            ),
        }

    def post(self, request, *args, **kwargs):
        user_selection = self.request.user.user_selections
        solution = self.get_object()
        selected_solutions = user_selection.selected_solutions
        self.toggle_select_solution(selected_solutions, solution)

        serializer = self.get_serializer(user_selection)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def toggle_select_solution(
        self, selected_solutions: QuerySet[Solution], new_solution: Solution
    ):
        if new_solution in selected_solutions.all():
            selected_solutions.remove(new_solution)
            return

        # Remove the other solutions in the same category that are exclusive
        to_remove = Q(
            category=new_solution.category,
            solution_logic__selection_rule=self.selection_rules["exclusive"],
        )

        selection_rule = new_solution.solution_logic.selection_rule
        # If the new solution is exclusive, remove other solutions in the same category
        if selection_rule == self.selection_rules["exclusive"]:
            to_remove |= Q(category=new_solution.category)
        # If the new solution has specific deselection logic, apply additional filters
        elif selection_rule == self.selection_rules["no_car"]:
            to_remove |= Q(name="No Car")
        elif selection_rule == self.selection_rules["electric_car"]:
            to_remove |= Q(name="Electric Car")

        selected_solutions.remove(*selected_solutions.filter(to_remove))
        selected_solutions.add(new_solution)

    def get_selection_rule(self, description):
        try:
            return SelectionRule.objects.get(description=description)
        except SelectionRule.DoesNotExist:
            return None


class ListUserSelectionAPIView(ListAPIView):
    """get: List all user selections.

    Returns a list of UserSelection instances. \
    If a user doesn't have a UserSelection instance, create one. \
    This operation is restricted to admin users.
    """

    queryset = UserSelection.objects.all().order_by("-created")
    serializer_class = UserSelectionSerializer
    permission_classes = [IsAdminUser]

    def get(self, request, *args, **kwargs):
        users_no_user_selections = User.objects.filter(user_selections__isnull=True)
        user_selections_to_create = [
            UserSelection(user=user) for user in users_no_user_selections
        ]
        UserSelection.objects.bulk_create(
            user_selections_to_create, ignore_conflicts=True
        )
        return super().get(request, *args, **kwargs)


class RetrieveUserSelectionAPIView(RetrieveAPIView):
    """get: Retrieve the user selections.

    Retrieve the user selections of the logged-in user. \
    If the user selections doesn't exist, create one.
    """

    serializer_class = UserSelectionSerializer

    def retrieve(self, request, *args, **kwargs):
        user_selections = self.request.user.user_selections
        serializer = self.get_serializer(user_selections)
        return Response(serializer.data)
