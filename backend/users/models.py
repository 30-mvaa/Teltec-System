# from django.db import models
# from django.contrib.auth.models import AbstractUser, BaseUserManager
# from django.utils.translation import gettext_lazy as _

# class UserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('El Email es obligatorio')
#         email = self.normalize_email(email)
#         user = self.model(email=email, **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user

#     def create_superuser(self, email, password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         extra_fields.setdefault('role', 'administrador')
        
#         if extra_fields.get('is_staff') is not True:
#             raise ValueError('Superuser debe tener is_staff=True.')
#         if extra_fields.get('is_superuser') is not True:
#             raise ValueError('Superuser debe tener is_superuser=True.')
        
#         return self.create_user(email, password, **extra_fields)

# class User(AbstractUser):
#     ROLE_CHOICES = (
#         ('administrador', 'Administrador'),
#         ('atencion_cliente', 'Atención al Cliente'),
#         ('cobros', 'Cobros'),
#     )
    
#     username = None
#     email = models.EmailField(_('email address'), unique=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='atencion_cliente')
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']
    
#     objects = UserManager()
#     ROLE_CHOICES = (
#         ('administrador', 'Administrador'),
#         ('atencion_cliente', 'Atención al Cliente'),
#         ('cobros', 'Cobros'),
#     )
    
#     username = None
#     email = models.EmailField(_('email address'), unique=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='atencion_cliente')
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['first_name', 'last_name']
    
#     objects = UserManager()
    
#     def __str__(self):
#         return self.email
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
        extra_fields.setdefault('rol', 'administrador')

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

    username = None
    email = models.EmailField(_('email address'), unique=True)
    rol = models.CharField(max_length=20, choices=ROLE_CHOICES, default='atencion_cliente')
    estado = models.BooleanField(default=True)  # Campo adicional opcional

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.email

