from django.urls import path
from friend_request.views import (
    FriendRequestCreateView,
    ListFriendRequestsView,
    ListFriendsView,
    RetrieveUpdateDestroyFriendRequestView,
)

urlpatterns = [
    path("", ListFriendsView.as_view(), name="friend-list"),
    path(
        "request/<int:user_id>/",
        FriendRequestCreateView.as_view(),
        name="friend-request-create",
    ),
    path("requests/", ListFriendRequestsView.as_view(), name="friend-request-list"),
    path(
        "requests/<int:friend_request_id>/",
        RetrieveUpdateDestroyFriendRequestView.as_view(),
        name="friend-request-detail",
    ),
]
