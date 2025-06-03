from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, 
    UserViewSet, 
    LoginView,
    ChangePasswordView,
    ResetPasswordView
)

router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset_password'),
    path('', include(router.urls)),
]
