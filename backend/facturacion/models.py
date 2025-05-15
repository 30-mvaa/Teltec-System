from django.db import models
from clientes.models import Contrato, Cliente

class Pago(models.Model):
    id_pago = models.AutoField(primary_key=True)
    id_contrato = models.ForeignKey(Contrato, on_delete=models.CASCADE, related_name='pagos', verbose_name="Contrato")
    fecha_pago = models.DateField(auto_now_add=True, verbose_name="Fecha de Pago")
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    metodo_pago = models.CharField(max_length=50, choices=[
        ('efectivo', 'Efectivo'),
        ('transferencia', 'Transferencia Bancaria'),
        ('tarjeta', 'Tarjeta de Crédito/Débito'),
        ('deposito', 'Depósito Bancario'),
        ('otro', 'Otro')
    ], verbose_name="Método de Pago")
    estado = models.CharField(max_length=30, default='completado', choices=[
        ('completado', 'Completado'),
        ('pendiente', 'Pendiente'),
        ('rechazado', 'Rechazado')
    ])
    mes_servicio = models.CharField(max_length=20, verbose_name="Mes de Servicio")  # Ejemplo: "2023-01"
    anio_servicio = models.IntegerField(verbose_name="Año de Servicio")
    comprobante = models.FileField(upload_to='comprobantes/', blank=True, null=True, verbose_name="Comprobante")
    notas = models.TextField(blank=True, null=True, verbose_name="Notas")
    
    def __str__(self):
        return f"Pago {self.id_pago} - {self.id_contrato.id_cliente}"
    
    class Meta:
        db_table = 'pagos'
        ordering = ['-fecha_pago']
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"

class Factura(models.Model):
    id_factura = models.AutoField(primary_key=True)
    id_pago = models.OneToOneField(Pago, on_delete=models.CASCADE, related_name='factura', verbose_name="Pago")
    fecha_emision = models.DateField(auto_now_add=True, verbose_name="Fecha de Emisión")
    monto_total = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Monto Total")
    numero_factura = models.CharField(max_length=50, unique=True, verbose_name="Número de Factura")
    clave_acceso_sri = models.CharField(max_length=100, blank=True, null=True, verbose_name="Clave de Acceso SRI")
    estado_sri = models.CharField(max_length=50, default='pendiente', choices=[
        ('pendiente', 'Pendiente'),
        ('autorizada', 'Autorizada'),
        ('rechazada', 'Rechazada')
    ], verbose_name="Estado SRI")
    ruta_pdf = models.CharField(max_length=255, blank=True, null=True, verbose_name="Ruta PDF")
    ruta_xml = models.CharField(max_length=255, blank=True, null=True, verbose_name="Ruta XML")
    
    def __str__(self):
        return f"Factura {self.numero_factura}"
    
    class Meta:
        db_table = 'facturas'
        ordering = ['-fecha_emision']
        verbose_name = "Factura"
        verbose_name_plural = "Facturas"

class Notificacion(models.Model):
    id_notificacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='notificaciones', verbose_name="Cliente")
    tipo = models.CharField(max_length=50, choices=[
        ('factura', 'Factura Emitida'),
        ('pago', 'Pago Recibido'),
        ('recordatorio', 'Recordatorio de Pago'),
        ('suspension', 'Aviso de Suspensión'),
        ('promocion', 'Promoción'),
        ('otro', 'Otro')
    ])
    mensaje = models.TextField()
    canal = models.CharField(max_length=50, choices=[
        ('email', 'Correo Electrónico'),
        ('sms', 'SMS'),
        ('whatsapp', 'WhatsApp'),
        ('app', 'Notificación App')
    ])
    fecha_envio = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Envío")
    estado_envio = models.CharField(max_length=20, default='enviado', choices=[
        ('enviado', 'Enviado'),
        ('fallido', 'Fallido'),
        ('pendiente', 'Pendiente')
    ], verbose_name="Estado de Envío")
    
    def __str__(self):
        return f"Notificación {self.id_notificacion} - {self.tipo}"
    
    class Meta:
        db_table = 'notificaciones'
        ordering = ['-fecha_envio']
        verbose_name = "Notificación"
        verbose_name_plural = "Notificaciones"