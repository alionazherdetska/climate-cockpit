from django.contrib.auth import get_user_model
from friend_request.models import get_friends
from post.models import Post
from post.serializers import PostSerializer
from rest_framework import status
from rest_framework.filters import SearchFilter
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from user.permissions import IsOwner

User = get_user_model()


class ListCreatePostAPIView(ListCreateAPIView):
    """get: List all posts.

    List all posts.\
    You can filter the posts with the URL search parameters.\
    For example, to search for posts with a keyword: /social/posts/?search=keyword

    post: Create a new post.

    Create a new post.
    """

    queryset = Post.objects.all().order_by("-created")
    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]
    parser_classes = (MultiPartParser, FormParser)  # Enable file upload support


class RetrieveUpdateDestroyPostAPIView(RetrieveUpdateDestroyAPIView):
    """get: Retrieve a post.

    Retrieve a post by post ID.

    put: Update a post.

    Update a post by post ID.

    patch: Update a post partially.

    Update a post partially by post ID.

    delete: Delete a post.

    Delete a post by post ID.
    """

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_url_kwarg = "post_id"
    parser_classes = (MultiPartParser, FormParser)  # Enable file upload support

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsOwner | IsAdminUser]
        return [permission() for permission in permission_classes]


class ToggleLikePost(CreateAPIView):
    """Toggle like post for the logged-in user.

    Toggle like post for the logged-in user by post ID.
    """

    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_url_kwarg = "post_id"

    def post(self, request, *args, **kwargs):
        instance = self.get_object()
        current_user = request.user
        liked_by = instance.liked_by
        if current_user in liked_by.all():
            liked_by.remove(current_user)
        else:
            liked_by.add(current_user)

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ListFollowingPost(ListAPIView):
    """List all posts of users the logged-in user follows.

    List all posts of users the logged-in user follows.\
    You can filter the posts with the URL search parameters.\
    For example, to search for posts with a keyword:\
    /social/posts/following/?search=keyword
    """

    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]

    def get_queryset(self):
        current_user = self.request.user
        return Post.objects.filter(user__in=current_user.followees.all()).order_by(
            "-created"
        )


class ListLikesPost(ListAPIView):
    """List all posts liked by the logged-in user.

    List all posts liked by the logged-in user.\
    You can filter the posts with the URL search parameters.\
    For example, to search for posts with a keyword: /social/posts/likes/?search=keyword
    """

    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]

    def get_queryset(self):
        return Post.objects.filter(liked_by=self.request.user).order_by("-created")


class ListMyPost(ListAPIView):
    """List all posts of the logged-in user.

    List all posts of the logged-in user.\
    You can filter the posts with the URL search parameters.\
    For example, to search for posts with a keyword: /social/posts/me/?search=keyword
    """

    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]

    def get_queryset(self):
        return Post.objects.filter(user=self.request.user).order_by("-created")


class ListUsersPost(ListAPIView):
    """List all posts of a specific user.

    List all posts of a specific user by user ID.\
    You can filter the posts with the URL search parameters.\
    For example, to search for posts with a keyword:\
    /social/posts/user/{user_id}/?search=keyword
    """

    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]
    lookup_url_kwarg = "user_id"

    def get_queryset(self):
        target_user_id = self.kwargs.get(self.lookup_url_kwarg)
        return Post.objects.filter(user=target_user_id).order_by("-created")


class ListFriendsPost(ListAPIView):
    """List all the posts of the logged-in user's friends.

    List all the posts of the logged-in user's friends.
    You can filter the posts with the URL search parameters.
    For example, to search for posts with a keyword:
    /social/posts/friends?search=keyword
    """

    serializer_class = PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["content"]

    def get_queryset(self):
        friends = get_friends(self.request.user)
        return Post.objects.filter(user__in=friends).order_by("-created")
