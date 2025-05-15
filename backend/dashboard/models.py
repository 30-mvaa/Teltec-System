from django.db import models
from users.models import User

class DashboardConfig(models.Model):
    id_config = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dashboard_config')
    widgets_activos = models.JSONField(default=dict, verbose_name="Widgets Activos")
    layout = models.JSONField(default=dict, verbose_name="Layout")
    tema = models.CharField(max_length=50, default='light', choices=[
        ('light', 'Claro'),
        ('dark', 'Oscuro'),
        ('system', 'Sistema')
    ])
    ultima_actualizacion = models.DateTimeField(auto_now=True, verbose_name="Última Actualización")
    
    def __str__(self):
        return f"Config Dashboard - {self.usuario.email}"
    
    class Meta:
        db_table = 'dashboard_config'
        verbose_name = "Configuración de Dashboard"
        verbose_name_plural = "Configuraciones de Dashboard"

class ReporteGuardado(models.Model):
    id_reporte = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reportes_guardados')
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50, choices=[
        ('clientes', 'Reporte de Clientes'),
        ('pagos', 'Reporte de Pagos'),
        ('facturas', 'Reporte de Facturación'),
        ('contratos', 'Reporte de Contratos'),
        ('personalizado', 'Reporte Personalizado')
    ])
    parametros = models.JSONField(default=dict, verbose_name="Parámetros")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nombre} - {self.usuario.email}"
    
    class Meta:
        db_table = 'reportes_guardados'
        ordering = ['-fecha_creacion']
        verbose_name = "Reporte Guardado"
        verbose_name_plural = "Reportes Guardados"