from django.contrib import admin

# Register your models here.
# clientes/admin.py
from django.contrib import admin
from .models import Cliente, Plan, Contrato

admin.site.register(Cliente)
admin.site.register(Plan)
admin.site.register(Contrato)