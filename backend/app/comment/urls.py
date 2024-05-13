from django.urls import path

from .views import (
    CreateGPTBotCommentAPIView,
    ListCreateCommentAPIView,
    RetrieveUpdateDestroyCommentAPIView,
)

urlpatterns = [
    path("<int:post_id>/", ListCreateCommentAPIView.as_view(), name="comment-list"),
    path(
        "<int:post_id>/gptbot-comment/<int:gptbot_user_id>",
        CreateGPTBotCommentAPIView.as_view(),
        name="gptbot-comment-create",
    ),
    path(
        "comment/<int:comment_id>/",
        RetrieveUpdateDestroyCommentAPIView.as_view(),
        name="comment-detail",
    ),
]
