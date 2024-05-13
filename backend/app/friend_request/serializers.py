from django.contrib.auth import get_user_model
from friend_request.models import FriendRequest, get_friend_requests_involved, is_friend
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from user.serializers import UserSerializer

User = get_user_model()


class FriendRequestSerializer(serializers.ModelSerializer):
    requester = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = FriendRequest
        fields = "__all__"


def validate_requester_not_receiver(requester, receiver):
    if requester == receiver:
        msg = "You cannot send a friend request to yourself."
        raise ValidationError({"receiver": [msg]})


def validate_friend_request_not_exist(requester, receiver):
    friend_requests = get_friend_requests_involved(requester, receiver)
    if friend_requests.exists():
        msg = "This friend request already exists"
        raise ValidationError({"receiver": [msg]})


def validate_not_friend(requester, receiver):
    if is_friend(requester, receiver):
        msg = "The user is already your friend."
        raise ValidationError({"receiver": [msg]})


def validate_status(old_status, new_status):
    if old_status != FriendRequest.DEFAULT_STATUS:
        msg = f"You can only modify {FriendRequest.DEFAULT_STATUS.label} requests."
        raise ValidationError({"status": [msg]})

    if new_status == FriendRequest.DEFAULT_STATUS:
        choices = FriendRequest.StatusChoices
        msg = (
            "You can only modify the status to "
            f"{choices.ACCEPTED} or {choices.REJECTED}."
        )
        raise ValidationError({"status": [msg]})
