from django.contrib import admin

from .solution_logic.models import (
    DashboardGroup,
    DashboardItem,
    ImpactDetail,
    SelectionRule,
    SolutionLogic,
)
from .solutions.models import Category, Resource, Solution, UserSelection

admin.site.register(Category)
admin.site.register(Solution)
admin.site.register(UserSelection)
admin.site.register(Resource)

admin.site.register(SelectionRule)
admin.site.register(DashboardGroup)
admin.site.register(DashboardItem)
admin.site.register(ImpactDetail)
admin.site.register(SolutionLogic)
