from django.contrib import admin
from .models import DashboardConfig, ReporteGuardado

@admin.register(DashboardConfig)
class DashboardConfigAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'tema', 'ultima_actualizacion')
    list_filter = ('tema',)
    search_fields = ('usuario__email',)
    readonly_fields = ('ultima_actualizacion',)

@admin.register(ReporteGuardado)
class ReporteGuardadoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'usuario', 'tipo', 'fecha_creacion')
    list_filter = ('tipo', 'fecha_creacion')
    search_fields = ('nombre', 'usuario__email')
    readonly_fields = ('fecha_creacion',)