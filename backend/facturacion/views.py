from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum
from datetime import datetime
from .models import Pago, Factura, Notificacion
from .serializers import (
    PagoSerializer, PagoCreateSerializer,
    FacturaSerializer, FacturaCreateSerializer,
    NotificacionSerializer
)
from users.permissions import IsAdminUser, IsClientServiceUser, IsPaymentUser

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'metodo_pago', 'mes_servicio', 'anio_servicio']
    search_fields = ['id_contrato__id_cliente__cedula', 'id_contrato__id_cliente__nombres', 'id_contrato__id_cliente__apellidos']
    ordering_fields = ['fecha_pago', 'monto']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PagoCreateSerializer
        return PagoSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser | IsPaymentUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
        return [permission() for permission in permission_classes]
    
    @action(detail=False, methods=['get'])
    def por_mes(self, request):
        mes = request.query_params.get('mes')
        anio = request.query_params.get('anio')
        
        if not mes or not anio:
            return Response({"error": "Debe proporcionar mes y año"}, status=status.HTTP_400_BAD_REQUEST)
        
        pagos = Pago.objects.filter(mes_servicio=mes, anio_servicio=anio)
        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def resumen_mensual(self, request):
        anio = request.query_params.get('anio', datetime.now().year)
        
        resumen = []
        for mes in range(1, 13):
            mes_str = f"{anio}-{mes:02d}"
            total = Pago.objects.filter(mes_servicio=mes_str, anio_servicio=anio).aggregate(total=Sum('monto'))
            
            resumen.append({
                'mes': mes_str,
                'total': total['total'] or 0
            })
        
        return Response(resumen)

class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Factura.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado_sri']
    search_fields = ['numero_factura', 'id_pago__id_contrato__id_cliente__cedula']
    ordering_fields = ['fecha_emision', 'monto_total']
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return FacturaCreateSerializer
        return FacturaSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser | IsPaymentUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
        return [permission() for permission in permission_classes]
    
    @action(detail=True, methods=['post'])
    def enviar_sri(self, request, pk=None):
        factura = self.get_object()
        
        # Aquí iría la lógica de integración con el SRI
        # Por ahora, simulamos el proceso
        factura.estado_sri = 'autorizada'
        factura.clave_acceso_sri = f"0123456789{factura.id_factura}"
        factura.save()
        
        return Response({"message": "Factura enviada al SRI correctamente"})
    
    @action(detail=True, methods=['get'])
    def generar_pdf(self, request, pk=None):
        factura = self.get_object()
        
        # Aquí iría la lógica para generar el PDF
        # Por ahora, simulamos el proceso
        factura.ruta_pdf = f"/media/facturas/factura_{factura.numero_factura}.pdf"
        factura.save()
        
        return Response({"message": "PDF generado correctamente", "url": factura.ruta_pdf})

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tipo', 'canal']
    search_fields = ['id_cliente__cedula', 'id_cliente__nombres', 'id_cliente__apellidos']
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser | IsClientServiceUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
        return [permission() for permission in permission_classes]