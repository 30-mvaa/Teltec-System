# pyright: reportMissingImports=false
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, PlanViewSet, ContratoViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'contratos', ContratoViewSet)
router.register(r'planes', PlanViewSet, basename='plan')

urlpatterns = [
    path('', include(router.urls)),
]