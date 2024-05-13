from rest_framework.permissions import BasePermission


class IsFriendRequestSender(BasePermission):
    message = "You are not the sender of the friend request."

    def has_object_permission(self, request, view, obj):
        return request.user == obj.requester


class IsFriendRequestReceiver(BasePermission):
    message = "You are not the receiver of the friend request."

    def has_object_permission(self, request, view, obj):
        return request.user == obj.receiver
