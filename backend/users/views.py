from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings

from .serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    ResetPasswordEmailSerializer
)

User = get_user_model()

# -----------------------
# Login personalizado JWT
# -----------------------
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response(
                {"detail": "No se encontró una cuenta activa con esas credenciales."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return super().post(request, *args, **kwargs)


# -----------------------
# Registro de usuario
# -----------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


# -----------------------
# Cambio de contraseña
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


# ---------------------------------------------
# Solicitud de restablecimiento de contraseña
# ---------------------------------------------
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

                frontend_url = settings.FRONTEND_URL
                reset_url = f"{frontend_url}/reset-password/{uid}/{token}/"

                subject = 'Restablecimiento de contraseña - Teltec Net'
                message = (
                    f"Hola {user.first_name},\n\n"
                    f"Para restablecer tu contraseña, haz clic en el siguiente enlace:\n\n"
                    f"{reset_url}\n\n"
                    f"Este enlace es válido por 10 minutos.\n\n"
                    f"Si no solicitaste este cambio, ignora este mensaje.\n\n"
                    f"Saludos,\nEquipo Teltec Net"
                )

                send_mail(
                    subject,
                    message,
                    settings.EMAIL_HOST_USER,
                    [user.email],
                    fail_silently=False,
                )

            except User.DoesNotExist:
                pass  # Para evitar revelar si el correo existe

            return Response(
                {"message": "Si el correo existe, se ha enviado un mensaje con instrucciones."},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---------------------------------------------
# Confirmación de restablecimiento de contraseña
# ---------------------------------------------
class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if not default_token_generator.check_token(user, token):
                return Response({"error": "Token inválido o expirado."}, status=status.HTTP_400_BAD_REQUEST)

            new_password = request.data.get("new_password")
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({"message": "Contraseña restablecida correctamente."}, status=status.HTTP_200_OK)

            return Response({"error": "Debes proporcionar una nueva contraseña."}, status=status.HTTP_400_BAD_REQUEST)

        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response({"error": "Usuario inválido."}, status=status.HTTP_400_BAD_REQUEST)
