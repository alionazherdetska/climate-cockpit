from django.contrib.auth import get_user_model
from django.db import models
from django_extensions.db.models import TimeStampedModel

User = get_user_model()


class Image(models.Model):
    image = models.ImageField(upload_to="post_images", null=True, blank=True)
    post = models.ForeignKey("Post", models.CASCADE, related_name="images")

    def __str__(self) -> str:
        return f"{self.image} for post {self.post}"


class Post(TimeStampedModel):
    user = models.ForeignKey(User, models.CASCADE, related_name="posts")
    content = models.TextField()
    liked_by = models.ManyToManyField(User, related_name="liked_posts", blank=True)
    shared = models.ForeignKey(
        "Post", models.CASCADE, related_name="sharing_posts", blank=True, null=True
    )

    def __str__(self):
        max_length = 30
        content = (
            f"{self.content[:max_length]}..."
            if len(self.content) > max_length
            else self.content
        )
        return f"Post {self.pk} by {self.user.username}: {content}"
