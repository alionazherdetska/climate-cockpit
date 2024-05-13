from django.contrib.auth import get_user_model
from rest_framework.filters import SearchFilter
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    RetrieveUpdateDestroyAPIView,
)
from user.serializers import UserSerializer

User = get_user_model()


class ListGptbotUserAPIView(ListAPIView):
    """get: List all GPTbot users.

    List all GPTbot users.
    """

    serializer_class = UserSerializer
    queryset = User.objects.filter(is_gptbot=True).order_by("-date_joined")


class ListUserAPIView(ListAPIView):
    """get: List all active users.

    List all active users.\
    You can filter the users with the URL search parameters.\
    For example, to search for posts with a keyword: /users/?search=keyword
    """

    serializer_class = UserSerializer
    queryset = User.objects.filter(is_active=True, is_staff=False).order_by(
        "-is_gptbot", "date_joined"
    )
    filter_backends = [SearchFilter]
    search_fields = [
        "username",
        "first_name",
        "last_name",
        "location",
        "about_me",
        "memberships",
    ]


class GetUserAPIView(RetrieveAPIView):
    """get: Retrieve one user.

    Retrieve one user by user ID.
    """

    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_url_kwarg = "user_id"


class GetUpdateDeleteMeAPIView(RetrieveUpdateDestroyAPIView):
    """get: Retrieve the logged-in user.

    Retrieve the logged-in user.

    put: Update the logged-in user.

    Update the logged-in user.

    patch: Update the logged-in user partially.

    Update the logged-in user partially.

    delete: Delete the logged-in user.

    Delete the logged-in user.
    """

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
