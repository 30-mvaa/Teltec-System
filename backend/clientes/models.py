from django.db import models

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    cedula = models.CharField(max_length=20, unique=True, verbose_name="Cédula/RUC")
    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    fecha_nacimiento = models.DateField(null=True, blank=True, verbose_name="Fecha de Nacimiento")
    edad = models.IntegerField(null=True, blank=True)
    direccion = models.CharField(max_length=150, verbose_name="Dirección")
    sector = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, blank=True, null=True, verbose_name="Correo Electrónico")
    telefono = models.CharField(max_length=20, verbose_name="Teléfono")
    estado = models.CharField(max_length=20, default='activo', choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')])
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")
    
    def __str__(self):
        return f"{self.nombres} {self.apellidos} - {self.cedula}"
    
    class Meta:
        db_table = 'clientes'
        ordering = ['apellidos', 'nombres']
        verbose_name = "Cliente"
        verbose_name_plural = "Clientes"

class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    nombre_plan = models.CharField(max_length=100, verbose_name="Nombre del Plan")
    velocidad_mbps = models.IntegerField(verbose_name="Velocidad (Mbps)")
    tarifa_mensual = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Tarifa Mensual")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    es_activo = models.BooleanField(default=True, verbose_name="¿Plan Activo?")
    
    def __str__(self):
        return f"{self.nombre_plan} - {self.velocidad_mbps}Mbps"
    
    class Meta:
        db_table = 'planes'
        ordering = ['tarifa_mensual']
        verbose_name = "Plan"
        verbose_name_plural = "Planes"

class Contrato(models.Model):
    id_contrato = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='contratos', verbose_name="Cliente")
    id_plan = models.ForeignKey(Plan, on_delete=models.CASCADE, related_name='contratos', verbose_name="Plan")
    fecha_inicio = models.DateField(auto_now_add=True, verbose_name="Fecha de Inicio")
    fecha_fin = models.DateField(null=True, blank=True, verbose_name="Fecha de Finalización")
    estado = models.CharField(max_length=20, default='activo', choices=[
        ('activo', 'Activo'),
        ('suspendido', 'Suspendido'),
        ('cancelado', 'Cancelado')
    ])
    direccion_instalacion = models.CharField(max_length=200, blank=True, null=True, verbose_name="Dirección de Instalación")
    observaciones = models.TextField(blank=True, null=True, verbose_name="Observaciones")
    
    def __str__(self):
        return f"Contrato {self.id_contrato} - {self.id_cliente}"
    
    class Meta:
        db_table = 'contratos'
        ordering = ['-fecha_inicio']
        verbose_name = "Contrato"
        verbose_name_plural = "Contratos"


