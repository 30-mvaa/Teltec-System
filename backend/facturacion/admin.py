from django.contrib import admin
from .models import Pago, Factura, Notificacion

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('id_pago', 'get_cliente', 'fecha_pago', 'monto', 'metodo_pago', 'estado', 'mes_servicio')
    list_filter = ('estado', 'metodo_pago', 'fecha_pago', 'anio_servicio')
    search_fields = ('id_contrato__id_cliente__cedula', 'id_contrato__id_cliente__nombres')
    raw_id_fields = ('id_contrato',)
    readonly_fields = ('fecha_pago',)
    
    def get_cliente(self, obj):
        return f"{obj.id_contrato.id_cliente.nombres} {obj.id_contrato.id_cliente.apellidos}"
    get_cliente.short_description = 'Cliente'

@admin.register(Factura)
class FacturaAdmin(admin.ModelAdmin):
    list_display = ('numero_factura', 'get_cliente', 'fecha_emision', 'monto_total', 'estado_sri')
    list_filter = ('estado_sri', 'fecha_emision')
    search_fields = ('numero_factura', 'id_pago__id_contrato__id_cliente__cedula')
    raw_id_fields = ('id_pago',)
    readonly_fields = ('fecha_emision',)
    
    def get_cliente(self, obj):
        return f"{obj.id_pago.id_contrato.id_cliente.nombres} {obj.id_pago.id_contrato.id_cliente.apellidos}"
    get_cliente.short_description = 'Cliente'
    
    actions = ['marcar_como_autorizada', 'generar_pdf']
    
    def marcar_como_autorizada(self, request, queryset):
        queryset.update(estado_sri='autorizada')
    marcar_como_autorizada.short_description = "Marcar facturas seleccionadas como autorizadas"
    
    def generar_pdf(self, request, queryset):
        for factura in queryset:
            factura.ruta_pdf = f"/media/facturas/factura_{factura.numero_factura}.pdf"
            factura.save()
    generar_pdf.short_description = "Generar PDF para facturas seleccionadas"

@admin.register(Notificacion)
class NotificacionAdmin(admin.ModelAdmin):
    list_display = ('id_notificacion', 'get_cliente', 'tipo', 'canal', 'fecha_envio', 'estado_envio')
    list_filter = ('tipo', 'canal', 'fecha_envio', 'estado_envio')
    search_fields = ('id_cliente__cedula', 'id_cliente__nombres', 'mensaje')
    raw_id_fields = ('id_cliente',)
    
    def get_cliente(self, obj):
        return f"{obj.id_cliente.nombres} {obj.id_cliente.apellidos}"
    get_cliente.short_description = 'Cliente'