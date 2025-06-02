from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Count, Sum
from clientes.models import Cliente, Contrato
from facturacion.models import Pago, Factura
from users.permissions import IsAdminUser, IsClientServiceUser, IsPaymentUser

class DashboardStatsView(APIView):
    # Todos los roles pueden ver el dashboard básico
    permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
    
    def get(self, request):
        # Total de clientes
        total_clientes = Cliente.objects.count()
        clientes_activos = Cliente.objects.filter(estado='activo').count()
        clientes_inactivos = Cliente.objects.filter(estado='inactivo').count()
        
        # Contratos por plan
        contratos_por_plan = Contrato.objects.filter(estado='activo').values('id_plan__nombre_plan').annotate(
            total=Count('id_contrato')
        )
        
        # Clientes por sector
        clientes_por_sector = Cliente.objects.values('sector').annotate(
            total=Count('id_cliente')
        )
        
        # Pagos recientes
        pagos_recientes = Pago.objects.order_by('-fecha_pago')[:10].values(
            'id_pago', 'fecha_pago', 'monto', 'id_contrato__id_cliente__nombres', 
            'id_contrato__id_cliente__apellidos'
        )
        
        # Facturas pendientes
        facturas_pendientes = Factura.objects.filter(estado_sri='pendiente').count()
        
        return Response({
            'total_clientes': total_clientes,
            'clientes_activos': clientes_activos,
            'clientes_inactivos': clientes_inactivos,
            'contratos_por_plan': contratos_por_plan,
            'clientes_por_sector': clientes_por_sector,
            'pagos_recientes': pagos_recientes,
            'facturas_pendientes': facturas_pendientes
        })

class FinancialStatsView(APIView):
    # Solo admin y cobros pueden ver estadísticas financieras
    permission_classes = [IsAdminUser | IsPaymentUser]
    
    def get(self, request):
        # Ingresos por mes
        ingresos_por_mes = Pago.objects.values('mes_servicio', 'anio_servicio').annotate(
            total=Sum('monto')
        ).order_by('anio_servicio', 'mes_servicio')
        
        # Ingresos por método de pago
        ingresos_por_metodo = Pago.objects.values('metodo_pago').annotate(
            total=Sum('monto')
        )
        
        # Facturas por estado
        facturas_por_estado = Factura.objects.values('estado_sri').annotate(
            total=Count('id_factura')
        )
        
        return Response({
            'ingresos_por_mes': ingresos_por_mes,
            'ingresos_por_metodo': ingresos_por_metodo,
            'facturas_por_estado': facturas_por_estado
        })

class AdminReportsView(APIView):
    # Solo admin puede ver reportes administrativos
    permission_classes = [IsAdminUser]
    
    def get(self, request):
        # Aquí irían reportes exclusivos para administradores
        return Response({
            'message': 'Reportes administrativos disponibles solo para administradores'
        })