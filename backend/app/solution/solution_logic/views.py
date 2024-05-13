from rest_framework.generics import ListAPIView

from .models import DashboardGroup, DashboardItem
from .serializers import DashboardGroupSerializer, DashboardItemSerializer


class ListDashboardItemAPIView(ListAPIView):
    """get: List all dashboard items.

    List all dashboard items.
    """

    queryset = DashboardItem.objects.all().order_by("group", "id")
    serializer_class = DashboardItemSerializer
    permission_classes = []


class ListDashboardGroupAPIView(ListAPIView):
    """get: List all dashboard groups.

    List all dashboard groups.
    """

    queryset = DashboardGroup.objects.all().order_by("id")
    serializer_class = DashboardGroupSerializer
    permission_classes = []
