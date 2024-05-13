from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.response import Response
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from user.serializers import UserSerializer

from .serializers import (
    PasswordResetSerializer,
    PasswordResetValidationSerializer,
    RegistrationSerializer,
    RegistrationValidationSerializer,
)

User = get_user_model()


class TokenUserObtainView(TokenObtainPairView):
    """post: Create a new session for a user. Sends back tokens and user."""

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as err:
            raise InvalidToken(err.args[0]) from err

        user = User.objects.get(email=request.data["email"])
        req = request
        req.user = user
        user_serializer = UserSerializer(instance=user, context={"request": req})
        res = {"user": user_serializer.data, **serializer.validated_data}
        return Response(res, status=status.HTTP_201_CREATED)


class RegistrationView(CreateAPIView):
    """post: Create a non-active user with email info only."""

    serializer_class = RegistrationSerializer
    permission_classes = []


class RegistrationValidationView(GenericAPIView):
    """patch: Update user info. Activate user."""

    serializer_class = RegistrationValidationSerializer
    permission_classes = []

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)


class PasswordResetView(CreateAPIView):
    """post: Send email with password reset code to user."""

    serializer_class = PasswordResetSerializer
    permission_classes = []

    def perform_create(self, serializer):
        serializer.send_password_reset_email()


class PasswordResetValidationView(GenericAPIView):
    """Update passwords."""

    permission_classes = []
    serializer_class = PasswordResetValidationSerializer

    def patch(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)
