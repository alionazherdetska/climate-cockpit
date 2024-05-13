from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    followees = models.ManyToManyField(to="User", related_name="followers", blank=True)
    avatar = models.ImageField(upload_to="avatars", null=True, blank=True)
    banner = models.ImageField(upload_to="banners", null=True, blank=True)
    location = models.CharField(max_length=200, blank=True)
    about_me = models.CharField(max_length=1000, blank=True)
    memberships = models.JSONField(max_length=30, default=list, blank=True)
    is_gptbot = models.BooleanField(default=False)
    gptbot_description = models.TextField(blank=True)

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
