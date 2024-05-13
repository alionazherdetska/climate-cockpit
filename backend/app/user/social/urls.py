from django.urls import path
from user.social.views import ListFollowersUser, ListFollowingUser, ToggleFollowingUser

urlpatterns = [
    path("followers/", ListFollowersUser.as_view(), name="user-list-followers"),
    path("following/", ListFollowingUser.as_view(), name="user-list-following"),
    path(
        "toggle-follow/<int:user_id>/",
        ToggleFollowingUser.as_view(),
        name="user-toggle-following",
    ),
]
