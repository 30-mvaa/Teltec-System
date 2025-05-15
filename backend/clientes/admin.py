from django.contrib import admin
from .models import Cliente, Plan, Contrato

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombres', 'apellidos', 'telefono', 'sector', 'estado')
    list_filter = ('estado', 'sector')
    search_fields = ('cedula', 'nombres', 'apellidos', 'telefono', 'email')
    fieldsets = (
        ('Información Personal', {
            'fields': ('cedula', 'nombres', 'apellidos', 'fecha_nacimiento', 'edad')
        }),
        ('Contacto', {
            'fields': ('direccion', 'sector', 'telefono', 'email')
        }),
        ('Estado', {
            'fields': ('estado',)
        })
    )
    readonly_fields = ('fecha_registro',)

@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('nombre_plan', 'velocidad_mbps', 'tarifa_mensual', 'es_activo')
    list_filter = ('velocidad_mbps', 'es_activo')
    search_fields = ('nombre_plan',)

@admin.register(Contrato)
class ContratoAdmin(admin.ModelAdmin):
    list_display = ('id_contrato', 'get_cliente', 'get_plan', 'fecha_inicio', 'estado')
    list_filter = ('estado', 'fecha_inicio')
    search_fields = ('id_cliente__cedula', 'id_cliente__nombres', 'id_cliente__apellidos')
    raw_id_fields = ('id_cliente', 'id_plan')
    
    def get_cliente(self, obj):
        return f"{obj.id_cliente.nombres} {obj.id_cliente.apellidos}"
    get_cliente.short_description = 'Cliente'
    
    def get_plan(self, obj):
        return obj.id_plan.nombre_plan
    get_plan.short_description = 'Plan'