from post.models import Image, Post
from rest_framework import serializers
from user.serializers import BasicUserSerializer, UserSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class SharedPostSerializer(serializers.ModelSerializer):
    user = BasicUserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ["id", "user", "content", "images", "created", "shared"]


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    images = ImageSerializer(many=True, read_only=True)
    logged_in_user_liked = serializers.SerializerMethodField()
    is_from_logged_in_user = serializers.SerializerMethodField()
    amount_of_likes = serializers.SerializerMethodField()

    def to_representation(self, instance: Post):
        representation = super().to_representation(instance)
        if instance.shared is None:
            representation["shared"] = None
        else:
            representation["shared"] = SharedPostSerializer(instance.shared).data
        return representation

    def get_logged_in_user_liked(self, instance: Post):
        user = self.context["request"].user
        return user.is_authenticated and instance.liked_by.filter(id=user.id).exists()

    def get_is_from_logged_in_user(self, instance: Post):
        user = self.context["request"].user
        return instance.user == user

    def get_amount_of_likes(self, instance: Post):
        return instance.liked_by.count()

    def save(self):
        super().save(user=self.context["request"].user)
        self._handle_images()

    def _handle_images(self):
        images_data = self.context["request"].FILES.getlist("images")
        Image.objects.filter(post=self.instance).delete()
        for image_data in images_data:
            Image.objects.create(post=self.instance, image=image_data)

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "images",
            "logged_in_user_liked",
            "is_from_logged_in_user",
            "amount_of_likes",
            "created",
            "shared",
        ]
