from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

User = get_user_model()


@admin.register(User)
class OurUserAdmin(UserAdmin):
    # fields shown when creating a new instance
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )
    # fields when reading / updating an instance
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "followees",
                    "avatar",
                    "banner",
                    "location",
                    "about_me",
                )
            },
        ),
        (
            "Permissions",
            {"fields": ("is_active", "is_staff", "is_superuser", "user_permissions")},
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
        ("Groups", {"fields": ("groups",)}),
    )
    # fields which are shown when looking at a list of instances
    list_display = ("email", "username", "is_staff", "is_superuser")
    ordering = ("date_joined",)
    readonly_fields = ("date_joined", "last_login")
