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
    cliente_nombre = serializers.SerializerMethodField()
    plan_nombre = serializers.SerializerMethodField()
    
    class Meta:
        model = Contrato
        fields = '__all__'
        
    def get_cliente_nombre(self, obj):
        return f"{obj.id_cliente.nombres} {obj.id_cliente.apellidos}"
    
    def get_plan_nombre(self, obj):
        return obj.id_plan.nombre_plan

class ContratoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = '__all__'