
# from rest_framework import serializers
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'email', 'first_name', 'last_name', 'password', 'role']
#         extra_kwargs = {
#             'password': {'write_only': True}
#         }

#     def create(self, validated_data):
#         user = User.objects.create_user(
#             email=validated_data['email'],
#             password=validated_data['password'],
#             first_name=validated_data.get('first_name', ''),
#             last_name=validated_data.get('last_name', ''),
#             role=validated_data.get('role', 'atencion_cliente')
#         )
#         return user


# class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Añadir datos personalizados al token
#         token['email'] = user.email
#         token['role'] = user.role
#         token['name'] = f"{user.first_name} {user.last_name}"
#         token['user_id'] = user.id

#         return token

#     def validate(self, attrs):
#         # Validación del usuario (credenciales)
#         data = super().validate(attrs)

#         # Agregar información adicional al response
#         data['email'] = self.user.email
#         data['role'] = self.user.role
#         data['name'] = f"{self.user.first_name} {self.user.last_name}"
#         data['user_id'] = self.user.id

#         return data


# class ChangePasswordSerializer(serializers.Serializer):
#     old_password = serializers.CharField(required=True)
#     new_password = serializers.CharField(required=True)


# class ResetPasswordEmailSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)


# # Añadir a los imports existentes
# from rest_framework import serializers

# # Añadir a los serializers existentes
# class ResetPasswordEmailSerializer(serializers.Serializer):
#     email = serializers.EmailField(required=True)
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'rol']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            rol=validated_data.get('rol', 'atencion_cliente')
        )
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['rol'] = user.rol
        token['name'] = f"{user.first_name} {user.last_name}"
        token['user_id'] = user.id
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['email'] = self.user.email
        data['rol'] = self.user.rol
        data['name'] = f"{self.user.first_name} {self.user.last_name}"
        data['user_id'] = self.user.id
        return data


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
