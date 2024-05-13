from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import (
    PasswordResetValidationView,
    PasswordResetView,
    RegistrationValidationView,
    RegistrationView,
    TokenUserObtainView,
)

token_urlpatterns = [
    path("", TokenUserObtainView.as_view(), name="token_obtain"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("verify/", TokenVerifyView.as_view(), name="token_verify"),
]


urlpatterns = [
    path("token/", include(token_urlpatterns)),
    path("registration/", RegistrationView.as_view()),
    path("registration/validation/", RegistrationValidationView.as_view()),
    path("password-reset/", PasswordResetView.as_view()),
    path("password-reset/validation/", PasswordResetValidationView.as_view()),
]
