from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

SchemaView = get_schema_view(
    openapi.Info(
        title="Climate Cockpit API",
        default_version="v1",
        description="API for Climate Cockpit Website",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="admin@email.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[],
)

social_urlpatterns = [
    path("followers/", include("user.social.urls")),
    path("posts/", include("post.urls")),
    path("comments/", include("comment.urls")),
    path("friends/", include("friend_request.urls")),
]

api_urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "docs/",
        SchemaView.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("users/", include("user.users.urls")),
    path("social/", include(social_urlpatterns)),
    path("auth/", include("registration.urls")),
    path("solution/", include("solution.urls")),
]

urlpatterns = [path("api/", include(api_urlpatterns))]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
