# backend/clientes/serializers.py

from rest_framework import serializers
from .models import Cliente, Plan, Contrato

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class ContratoSerializer(serializers.ModelSerializer):
    cliente_nombre_completo = serializers.SerializerMethodField(read_only=True)
    plan_nombre = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Contrato
        fields = '__all__'

    def get_cliente_nombre_completo(self, obj):
        return f"{obj.id_cliente.nombres} {obj.id_cliente.apellidos}"

    def get_plan_nombre(self, obj):
        return obj.id_plan.nombre_plan

class ContratoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'

    def validate(self, data):
        # Ejemplo de validación: evitar contratos duplicados
        if Contrato.objects.filter(id_cliente=data['id_cliente'], estado='activo').exists():
            raise serializers.ValidationError("Este cliente ya tiene un contrato activo.")
        return data
