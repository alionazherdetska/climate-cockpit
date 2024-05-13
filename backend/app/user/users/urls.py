from django.urls import path
from user.users.views import (
    GetUpdateDeleteMeAPIView,
    GetUserAPIView,
    ListGptbotUserAPIView,
    ListUserAPIView,
)

urlpatterns = [
    path("", ListUserAPIView.as_view(), name="user-list"),
    path("gptbot/", ListGptbotUserAPIView.as_view(), name="gptbotuser-list"),
    path("<int:user_id>/", GetUserAPIView.as_view(), name="user-details"),
    path("me/", GetUpdateDeleteMeAPIView.as_view(), name="user-me"),
]
