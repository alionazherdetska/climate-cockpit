from django.urls import path
from solution.solution_logic.views import (
    ListDashboardGroupAPIView,
    ListDashboardItemAPIView,
)
from solution.solutions.views import (
    ListCategoryAPIView,
    ListResourceAPIView,
    ListScorecardAPIView,
    ListSolutionAPIView,
    ListUserSelectionAPIView,
    RetrieveSolutionAPIView,
    RetrieveUserSelectionAPIView,
    ToggleSelectSolution,
)

urlpatterns = [
    path("solutions/", ListSolutionAPIView.as_view(), name="solution-list"),
    path(
        "solutions/<int:solution_id>/",
        RetrieveSolutionAPIView.as_view(),
        name="solution-detail",
    ),
    path(
        "scorecards/<int:user_id>/",
        ListScorecardAPIView.as_view(),
        name="scorecard-detail",
    ),
    path(
        "categories/",
        ListCategoryAPIView.as_view(),
        name="category-list",
    ),
    path(
        "resources/<int:solution_id>/",
        ListResourceAPIView.as_view(),
        name="resource-list-solution",
    ),
    path(
        "toggle-select/<int:solution_id>/",
        ToggleSelectSolution.as_view(),
        name="toggle-select-solution",
    ),
    path(
        "user-selections/list/",
        ListUserSelectionAPIView.as_view(),
        name="user-selections-list",
    ),
    path(
        "user-selections/",
        RetrieveUserSelectionAPIView.as_view(),
        name="user-selections-detail",
    ),
    path(
        "dashboard-items/",
        ListDashboardItemAPIView.as_view(),
        name="dashboard-item-list",
    ),
    path(
        "dashboard-groups/",
        ListDashboardGroupAPIView.as_view(),
        name="dashboard-group-list",
    ),
]
