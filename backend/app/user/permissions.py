from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class ObjNotLoggedInUser(BasePermission):
    message = "User cannot perform this operation with themselves."

    def has_object_permission(self, request, view, obj):
        return obj != request.user
