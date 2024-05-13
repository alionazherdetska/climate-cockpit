from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from user.permissions import ObjNotLoggedInUser
from user.serializers import UserSerializer

User = get_user_model()


class ListFollowersUser(ListAPIView):
    """List all followers of the logged-in user.

    List all followers of the logged-in user.
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(followees=self.request.user).order_by("-date_joined")


class ListFollowingUser(ListAPIView):
    """List all Users the logged-in user is following.

    List all Users the logged-in user is following.
    """

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(followers=self.request.user).order_by("-date_joined")


class ToggleFollowingUser(GenericAPIView):
    """Toggle following a user.

    Toggle following a user by user ID.
    """

    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = "user_id"
    permission_classes = [IsAuthenticated, ObjNotLoggedInUser]

    def post(self, request, *args, **kwargs):
        target_user = self.get_object()
        current_user = self.request.user
        followees = current_user.followees

        if target_user in followees.all():
            followees.remove(target_user)
        else:
            followees.add(target_user)

        serializer = self.get_serializer(current_user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
