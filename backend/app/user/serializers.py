from django.contrib.auth import get_user_model
from django.db.models import Q, Sum
from friend_request.models import FriendRequest, get_friends, is_friend
from post.models import Post
from rest_framework import serializers
from utils import generate_aggregate

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    logged_in_user_is_following = serializers.SerializerMethodField()
    logged_in_user_is_friends = serializers.SerializerMethodField()
    logged_in_user_is_rejected = serializers.SerializerMethodField()
    logged_in_user_received_fr = serializers.SerializerMethodField()
    logged_in_user_sent_fr = serializers.SerializerMethodField()
    amount_of_posts = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()
    amount_of_friends = serializers.SerializerMethodField()
    amount_of_followers = serializers.SerializerMethodField()
    amount_following = serializers.SerializerMethodField()
    total_impact = serializers.SerializerMethodField()

    def get_logged_in_user_is_following(self, instance: User):
        current_user = self.context["request"].user
        return instance.followers.filter(id=current_user.id).exists()

    def get_logged_in_user_is_friends(self, instance: User):
        current_user = self.context["request"].user
        return is_friend(instance, current_user)

    def get_logged_in_user_is_rejected(self, instance: User):
        current_user = self.context["request"].user
        return FriendRequest.objects.filter(
            Q(requester=instance),
            Q(receiver=current_user),
            status=FriendRequest.StatusChoices.REJECTED,
        ).exists()

    def get_logged_in_user_received_fr(self, instance: User):
        current_user = self.context["request"].user
        return FriendRequest.objects.filter(
            Q(requester=instance),
            Q(receiver=current_user),
            status=FriendRequest.StatusChoices.PENDING,
        ).exists()

    def get_logged_in_user_sent_fr(self, instance: User):
        current_user = self.context["request"].user
        return FriendRequest.objects.filter(
            Q(requester=current_user),
            Q(receiver=instance),
            status=FriendRequest.StatusChoices.PENDING,
        ).exists()

    def get_amount_of_posts(self, instance: User):
        return instance.posts.count()

    def get_amount_of_likes(self, instance: User):
        return Post.objects.filter(liked_by=instance).count()

    def get_amount_of_friends(self, instance: User):
        return get_friends(instance).count()

    def get_amount_of_followers(self, instance: User):
        return instance.followers.count()

    def get_amount_following(self, instance: User):
        return instance.followees.count()

    def get_total_impact(self, instance: User):
        selected_solutions = instance.user_selections.selected_solutions.all()
        return generate_aggregate(selected_solutions, Sum("impact"))

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "username",
            "avatar",
            "banner",
            "location",
            "about_me",
            "logged_in_user_is_following",
            "logged_in_user_is_friends",
            "logged_in_user_is_rejected",
            "logged_in_user_received_fr",
            "logged_in_user_sent_fr",
            "amount_of_posts",
            "amount_of_likes",
            "amount_of_friends",
            "amount_of_followers",
            "amount_following",
            "memberships",
            "total_impact",
            "is_gptbot",
        ]


class BasicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "username", "avatar"]
