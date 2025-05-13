from django.db import models

# Create your models here.
# En models.py de cada app
class Meta:
    permissions = [
        ("view_dashboard", "Can view dashboard"),
        ("manage_clients", "Can manage clients"),
        # etc.
    ]