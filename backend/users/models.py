from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'administrador')
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')
        
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    ROLE_CHOICES = (
        ('administrador', 'Administrador'),
        ('atencion_cliente', 'Atención al Cliente'),
        ('cobros', 'Cobros'),
    )
    
    # Hacer que username no sea requerido
    username = models.CharField(
        _('username'),
        max_length=150,
        unique=True,
        blank=True,
        null=True,
        help_text=_('Optional. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
    )
    email = models.EmailField(_('email address'), unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='atencion_cliente')
    
    # Configurar email como campo de login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    
    objects = UserManager()
    
    class Meta:
        swappable = 'AUTH_USER_MODEL'
    
    def save(self, *args, **kwargs):
        # Auto-generar username basado en email si no se proporciona
        if not self.username:
            self.username = self.email.split('@')[0]
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
