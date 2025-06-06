# backend/clientes/views.py

from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Cliente, Plan, Contrato
from .serializers import ClienteSerializer, PlanSerializer, ContratoSerializer, ContratoCreateSerializer
from users.permissions import IsAdminUser, IsClientServiceUser, IsPaymentUser


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado', 'sector']
    search_fields = ['cedula', 'nombres', 'apellidos', 'email', 'telefono']
    ordering_fields = ['apellidos', 'nombres', 'fecha_registro']
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser | IsClientServiceUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]

        return [permission() for permission in permission_classes]


    @action(detail=False, methods=['get'])
    def activos(self, request):
        clientes = Cliente.objects.filter(estado='activo')
        serializer = self.get_serializer(clientes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def inactivos(self, request):
        clientes = Cliente.objects.filter(estado='inactivo')
        serializer = self.get_serializer(clientes, many=True)
        return Response(serializer.data)


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
        return [permission() for permission in permission_classes]


class ContratoViewSet(viewsets.ModelViewSet):
    queryset = Contrato.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['estado', 'id_cliente', 'id_plan']
    search_fields = ['id_cliente__cedula', 'id_cliente__nombres', 'id_cliente__apellidos']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ContratoCreateSerializer
        return ContratoSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminUser | IsClientServiceUser]
        else:
            permission_classes = [IsAdminUser | IsClientServiceUser | IsPaymentUser]
        return [permission() for permission in permission_classes]

    @action(detail=False, methods=['get'])
    def activos(self, request):
        contratos = Contrato.objects.filter(estado='activo')
        serializer = self.get_serializer(contratos, many=True)
        return Response(serializer.data)
