# # backend/users/views.py

# import logging
# import json
# from django.conf import settings
# from django.core.mail import send_mail
# from django.utils.encoding import force_bytes
# from django.utils.http import urlsafe_base64_encode
# from django.contrib.auth.tokens import default_token_generator
# from django.contrib.auth import get_user_model, authenticate, login, logout
# from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
# from django.views.decorators.http import require_http_methods
# from django.http import JsonResponse
# from rest_framework import generics, status, permissions, viewsets
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.decorators import api_view, permission_classes
# from django.middleware.csrf import get_token
# from rest_framework.permissions import IsAuthenticated
# from .serializers import (
#     UserSerializer,
#     ChangePasswordSerializer,
#     ResetPasswordEmailSerializer
# )

# logger = logging.getLogger(__name__)
# User = get_user_model()

# # -----------------------
# # CSRF
# # -----------------------

# @ensure_csrf_cookie
# def csrf_token_view(request):
#     return JsonResponse({"message": "Token CSRF enviado"})

# @ensure_csrf_cookie
# def csrf_test(request):
#     return JsonResponse({"message": "CSRF token set"})

# # -----------------------
# # LOGIN CON SESIONES
# # -----------------------

# @require_http_methods(["POST"])
# @csrf_exempt
# def session_login(request):
#     try:
#         data = json.loads(request.body)
#         email = data.get("username")
#         password = data.get("password")

#         if not email or not password:
#             return JsonResponse({"error": "Correo y contraseña requeridos."}, status=400)

#         user = authenticate(request, username=email, password=password)

#         if user is not None and user.is_active:
#             login(request, user)
#             return JsonResponse({
#                 "message": "Sesión iniciada con éxito",
#                 "email": user.email,
#                 "name": f"{user.first_name} {user.last_name}",
#                 "rol": user.rol,
#                 "user_id": user.id,
#                 "csrfToken": get_token(request),
#             })
#         return JsonResponse({"error": "Credenciales incorrectas."}, status=401)
#     except json.JSONDecodeError:
#         return JsonResponse({"error": "JSON inválido."}, status=400)

# @api_view(["POST"])
# @permission_classes([permissions.AllowAny])
# def session_logout(request):
#     logout(request)
#     return Response({"message": "Sesión cerrada correctamente"})

# # -----------------------
# # REGISTRO
# # -----------------------

# class RegisterView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     permission_classes = [permissions.AllowAny]
#     serializer_class = UserSerializer

# # -----------------------
# # LISTAR Y CREAR USUARIOS
# # -----------------------

# class ListUsersView(generics.ListCreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     # Nota: El frontend ya envía el token CSRF y credentials: "include"

# # -----------------------
# # CAMBIO DE CONTRASEÑA
# # -----------------------

# class ChangePasswordView(generics.UpdateAPIView):
#     serializer_class = ChangePasswordSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_object(self):
#         return self.request.user

#     def update(self, request, *args, **kwargs):
#         user = self.get_object()
#         serializer = self.get_serializer(data=request.data)

#         if serializer.is_valid():
#             if not user.check_password(serializer.validated_data.get("old_password")):
#                 return Response({"old_password": ["Contraseña actual incorrecta."]}, status=status.HTTP_400_BAD_REQUEST)

#             user.set_password(serializer.validated_data.get("new_password"))
#             user.save()
#             return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# # -----------------------
# # RESET DE CONTRASEÑA
# # -----------------------

# class RequestPasswordResetView(APIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = ResetPasswordEmailSerializer

#     def post(self, request):
#         serializer = self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             email = serializer.validated_data['email']
#             try:
#                 user = User.objects.get(email=email)
#                 token = default_token_generator.make_token(user)
#                 uid = urlsafe_base64_encode(force_bytes(user.pk))

#                 reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

#                 subject = 'Restablecimiento de contraseña - Teltec Net'
#                 message = (
#                     f"Hola {user.first_name},\n\n"
#                     f"Para restablecer tu contraseña, haz clic en el siguiente enlace:\n\n"
#                     f"{reset_url}\n\n"
#                     f"Este enlace es válido por 10 minutos.\n\n"
#                     f"Si no solicitaste este cambio, ignora este mensaje.\n\n"
#                     f"Saludos,\nEquipo Teltec Net"
#                 )

#                 send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)

#             except User.DoesNotExist:
#                 pass

#             return Response(
#                 {"message": "Si el correo existe, se ha enviado un mensaje con instrucciones."},
#                 status=status.HTTP_200_OK
#             )

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User = get_user_model()

# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]

import logging
import json
from django.conf import settings
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from rest_framework import viewsets, generics, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.middleware.csrf import get_token

from .serializers import (
    UserSerializer,
    ChangePasswordSerializer,
    ResetPasswordEmailSerializer
)

logger = logging.getLogger(__name__)
User = get_user_model()

# -----------------------
# CSRF
# -----------------------

@ensure_csrf_cookie
def csrf_token_view(request):
    return JsonResponse({"message": "Token CSRF enviado"})

@ensure_csrf_cookie
def csrf_test(request):
    return JsonResponse({"message": "CSRF token set"})

# -----------------------
# LOGIN CON SESIONES
# -----------------------

@require_http_methods(["POST"])
@csrf_exempt
def session_login(request):
    try:
        data = json.loads(request.body)
        email = data.get("username")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error": "Correo y contraseña requeridos."}, status=400)

        user = authenticate(request, username=email, password=password)

        if user is not None and user.is_active:
            login(request, user)
            return JsonResponse({
                "message": "Sesión iniciada con éxito",
                "email": user.email,
                "name": f"{user.first_name} {user.last_name}",
                "rol": user.rol,
                "user_id": user.id,
                "csrfToken": get_token(request),
            })
        return JsonResponse({"error": "Credenciales incorrectas."}, status=401)
    except json.JSONDecodeError:
        return JsonResponse({"error": "JSON inválido."}, status=400)

@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def session_logout(request):
    logout(request)
    return Response({"message": "Sesión cerrada correctamente"})

# -----------------------
# REGISTRO
# -----------------------

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# -----------------------
# CRUD DE USUARIOS
# -----------------------

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

# -----------------------
# CAMBIO DE CONTRASEÑA
# -----------------------

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not user.check_password(serializer.validated_data.get("old_password")):
                return Response({"old_password": ["Contraseña actual incorrecta."]}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data.get("new_password"))
            user.save()
            return Response({"message": "Contraseña actualizada correctamente."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# -----------------------
# RESET DE CONTRASEÑA
# -----------------------

class RequestPasswordResetView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ResetPasswordEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                uid = urlsafe_base64_encode(force_bytes(user.pk))

                reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

                subject = 'Restablecimiento de contraseña - Teltec Net'
                message = (
                    f"Hola {user.first_name},\n\n"
                    f"Para restablecer tu contraseña, haz clic en el siguiente enlace:\n\n"
                    f"{reset_url}\n\n"
                    f"Este enlace es válido por 10 minutos.\n\n"
                    f"Si no solicitaste este cambio, ignora este mensaje.\n\n"
                    f"Saludos,\nEquipo Teltec Net"
                )

                send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email], fail_silently=False)

            except User.DoesNotExist:
                pass  # no revelar si el email existe o no

            return Response(
                {"message": "Si el correo existe, se ha enviado un mensaje con instrucciones."},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

