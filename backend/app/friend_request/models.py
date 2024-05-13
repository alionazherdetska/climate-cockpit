from django.contrib.auth import get_user_model
from django.db import models
from django.db.models import Q
from django_extensions.db.models import TimeStampedModel

User = get_user_model()


class FriendRequest(TimeStampedModel):
    class StatusChoices(models.TextChoices):
        PENDING = "P", "pending"
        ACCEPTED = "A", "accepted"
        REJECTED = "R", "rejected"

    DEFAULT_STATUS = StatusChoices.PENDING

    requester = models.ForeignKey(
        User, models.CASCADE, related_name="friend_requests_sent"
    )
    receiver = models.ForeignKey(
        User, models.CASCADE, related_name="friend_requests_received"
    )
    status = models.CharField(
        max_length=1,
        choices=StatusChoices.choices,
        default=DEFAULT_STATUS,
        help_text=f"Select from {StatusChoices.choices}",
    )

    def __str__(self):
        return (
            f"FriendRequest from {self.requester} to {self.receiver} "
            f"({self.get_status_display()})"
        )


def get_friend_requests_involved(user1, user2=None):
    if user2:
        return FriendRequest.objects.filter(
            Q(requester=user1, receiver=user2) | Q(requester=user2, receiver=user1)
        )
    return FriendRequest.objects.filter(Q(requester=user1) | Q(receiver=user1))


def get_friends(user):
    accepted_friend_requests = get_friend_requests_involved(user).filter(
        status=FriendRequest.StatusChoices.ACCEPTED
    )
    friends = User.objects.filter(
        Q(friend_requests_sent__in=accepted_friend_requests)
        | Q(friend_requests_received__in=accepted_friend_requests)
    )
    return friends.exclude(id=user.id).distinct()


def is_friend(user_1, user_2):
    return get_friends(user_1).filter(id=user_2.id).exists()
