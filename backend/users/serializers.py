from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_active', 'role', 'date_joined']
        read_only_fields = ['id', 'date_joined']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password', 'is_active', 'role']
        extra_kwargs = {
            'username': {'required': False},  # Username no es requerido
        }
    
    def create(self, validated_data):
        # Si no se proporciona username, generarlo del email
        if not validated_data.get('username'):
            validated_data['username'] = validated_data['email'].split('@')[0]
            
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=validated_data.get('is_active', True),
            role=validated_data.get('role', 'atencion_cliente'),
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        if email and password:
            # Autenticar usando email
            user = authenticate(username=email, password=password)
            
            if not user:
                raise serializers.ValidationError('Credenciales inválidas')
            
            if not user.is_active:
                raise serializers.ValidationError('Cuenta desactivada')
            
            # Generar tokens
            refresh = RefreshToken.for_user(user)
            
            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }
        else:
            raise serializers.ValidationError('Debe proporcionar email y contraseña')

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return attrs

class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
