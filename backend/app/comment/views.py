import os

from django.contrib.auth import get_user_model
from openai import OpenAI
from post.models import Post
from rest_framework.generics import (
    CreateAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
    get_object_or_404,
)
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, IsAuthenticated
from user.permissions import IsOwner

from .models import Comment
from .serializers import CommentSerializer

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
OPENAI_MODEL_NAME = "gpt-3.5-turbo"
USER_ROLE = "user"
SYSTEM_ROLE = "system"

client = OpenAI(api_key=OPENAI_API_KEY)
User = get_user_model()


class CreateGPTBotCommentAPIView(CreateAPIView):
    """post: Create a GPTbot comment to a post.

    Create a GPTbot comment to a post by post ID and GPTbot user ID.
    """

    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        post_id = kwargs.get("post_id")
        post = get_object_or_404(Post, id=post_id)

        gptbot_user_id = kwargs.get("gptbot_user_id")
        gptbot_user = get_object_or_404(User, id=gptbot_user_id, is_gptbot=True)

        gptbot_response = self.get_gptbot_response(gptbot_user, post.content)
        request.data.update(
            {"user": gptbot_user, "post": post, "content": gptbot_response}
        )
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(**self.request.data)

    def get_gptbot_response(self, gptbot_user: User, user_text: str):
        user_message = {"role": USER_ROLE, "content": user_text}
        system_message = {
            "role": SYSTEM_ROLE,
            "content": gptbot_user.gptbot_description,
        }
        messages_history = [system_message, user_message]
        response = client.chat.completions.create(
            model=OPENAI_MODEL_NAME, messages=messages_history
        )
        return response.choices[0].message.content


class ListCreateCommentAPIView(ListCreateAPIView):
    """get: List all comments of a post.

    List all comments of a post by post ID.

    post: Create a new comment to a post.

    Create a new comment to a post by post ID.
    """

    serializer_class = CommentSerializer
    lookup_url_kwarg = "post_id"

    def get_queryset(self):
        post_id = self.kwargs.get(self.lookup_url_kwarg)
        target_post = get_object_or_404(Post, id=post_id)
        return Comment.objects.filter(post=target_post).order_by("-created")

    def perform_create(self, serializer):
        post_id = self.kwargs.get(self.lookup_url_kwarg)
        target_post = get_object_or_404(Post, id=post_id)
        serializer.save(user=self.request.user, post=target_post)


class RetrieveUpdateDestroyCommentAPIView(RetrieveUpdateDestroyAPIView):
    """get: Retrieve a comment.

    Retrieve a comment by comment ID.

    put: Update a comment.

    Update a comment by comment ID.

    patch: Update a comment partially.

    Update a comment partially by comment ID.

    delete: Delete a comment.

    Delete a comment by comment ID.
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_url_kwarg = "comment_id"

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsOwner | IsAdminUser]
        return [permission() for permission in permission_classes]
