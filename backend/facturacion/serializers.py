from rest_framework import serializers
from .models import Pago, Factura, Notificacion
from clientes.serializers import ContratoSerializer


class PagoSerializer(serializers.ModelSerializer):
    cliente = serializers.SerializerMethodField()
    cedula = serializers.SerializerMethodField()
    plan = serializers.SerializerMethodField()

    class Meta:
        model = Pago
        fields = ['id_pago', 'fecha_pago', 'monto', 'metodo', 'estado', 'cliente', 'cedula', 'plan']

    def get_cliente(self, obj):
        return f"{obj.id_contrato.id_cliente.nombres} {obj.id_contrato.id_cliente.apellidos}"

    def get_cedula(self, obj):
        return obj.id_contrato.id_cliente.cedula

    def get_plan(self, obj):
        return obj.id_contrato.id_plan.nombre_plan

class PagoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__'

class FacturaSerializer(serializers.ModelSerializer):
    pago_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Factura
        fields = '__all__'
    
    def get_pago_info(self, obj):
        return {
            'monto': obj.id_pago.monto,
            'fecha_pago': obj.id_pago.fecha_pago,
            'cliente': f"{obj.id_pago.id_contrato.id_cliente.nombres} {obj.id_pago.id_contrato.id_cliente.apellidos}",
            'cedula': obj.id_pago.id_contrato.id_cliente.cedula
        }

class FacturaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'

class NotificacionSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.SerializerMethodField()
    
    class Meta:
        model = Notificacion
        fields = '__all__'
    
    def get_cliente_nombre(self, obj):
        return f"{obj.id_cliente.nombres} {obj.id_cliente.apellidos}"