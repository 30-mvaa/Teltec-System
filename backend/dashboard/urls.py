# pyright: reportMissingImports=false
from django.urls import path
from .views import DashboardStatsView, FinancialStatsView

urlpatterns = [
    path('stats/', DashboardStatsView.as_view(), name='dashboard_stats'),
    path('financial/', FinancialStatsView.as_view(), name='financial_stats'),
]
