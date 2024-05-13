from django.contrib.auth import get_user_model
from friend_request.models import (
    FriendRequest,
    get_friend_requests_involved,
    get_friends,
)
from friend_request.permissions import IsFriendRequestReceiver, IsFriendRequestSender
from friend_request.serializers import (
    FriendRequestSerializer,
    validate_friend_request_not_exist,
    validate_not_friend,
    validate_requester_not_receiver,
    validate_status,
)
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404,
)
from rest_framework.permissions import IsAuthenticated
from user.serializers import UserSerializer

User = get_user_model()


class ListFriendsView(ListAPIView):
    """List all of logged-in users accepted friends.

    List all of logged-in users accepted friends.
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return get_friends(self.request.user)


class FriendRequestCreateView(CreateAPIView):
    """Create a new pending friend request.

    Create a new pending friend request.
    """

    serializer_class = FriendRequestSerializer
    lookup_url_kwarg = "user_id"

    def perform_create(self, serializer):
        requester = self.request.user
        user_id = self.kwargs.get(self.lookup_url_kwarg)
        receiver = get_object_or_404(User, id=user_id)
        validate_requester_not_receiver(requester, receiver)
        validate_friend_request_not_exist(requester, receiver)
        validate_not_friend(requester, receiver)

        serializer.save(
            requester=requester, receiver=receiver, status=FriendRequest.DEFAULT_STATUS
        )


class ListFriendRequestsView(ListAPIView):
    """List all friend requests in which the logged-in user is involved.

    List all friend requests in which the logged-in user is involved.
    """

    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return get_friend_requests_involved(self.request.user).order_by("-modified")


class RetrieveUpdateDestroyFriendRequestView(RetrieveUpdateDestroyAPIView):
    """get: Retrieve a friend request.

    Retrieve a friend request.

    put: Update the status of a friend request.

    Update the status of a friend request.\
    (allowed for the receiver of the friend request)

    patch: Update the status of a friend request partially.

    Update the status of a friend request partially.\
    (allowed for the receiver of the friend request)

    delete: Delete a friend request.

    Delete a friend request.\
    (allowed for the sender of the friend request)
    """

    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    lookup_url_kwarg = "friend_request_id"

    def get_permissions(self):
        permission_classes = [IsAuthenticated]
        if self.request.method in ["PUT", "PATCH"]:
            permission_classes += [IsFriendRequestReceiver]
        elif self.request.method in ["DELETE"]:
            permission_classes += [IsFriendRequestSender | IsFriendRequestReceiver]
        return [permission() for permission in permission_classes]

    def perform_update(self, serializer):
        instance = self.get_object()
        validate_status(instance.status, serializer.validated_data["status"])
        serializer.save()
