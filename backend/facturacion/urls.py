from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PagoViewSet, FacturaViewSet, NotificacionViewSet
from .views import pagos_list

router = DefaultRouter()
router.register(r'pagos', PagoViewSet)
router.register(r'facturas', FacturaViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("pagos/", pagos_list, name="pagos-list"),

]
