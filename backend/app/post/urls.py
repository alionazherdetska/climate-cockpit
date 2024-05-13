from django.urls import path
from post.views import (
    ListCreatePostAPIView,
    ListFollowingPost,
    ListFriendsPost,
    ListLikesPost,
    ListMyPost,
    ListUsersPost,
    RetrieveUpdateDestroyPostAPIView,
    ToggleLikePost,
)

urlpatterns = [
    path("", ListCreatePostAPIView.as_view(), name="post-list"),
    path(
        "<int:post_id>/", RetrieveUpdateDestroyPostAPIView.as_view(), name="post-detail"
    ),
    path(
        "toggle-like/<int:post_id>/", ToggleLikePost.as_view(), name="post-toggle-like"
    ),
    path("following/", ListFollowingPost.as_view(), name="post-list-following"),
    path("friends/", ListFriendsPost.as_view(), name="post-list-friends"),
    path("likes/", ListLikesPost.as_view(), name="post-list-likes"),
    path("me/", ListMyPost.as_view(), name="post-list-me"),
    path("user/<int:user_id>/", ListUsersPost.as_view(), name="post-list-user"),
]
