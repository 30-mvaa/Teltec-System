
# # En backend/users/urls.py
# from django.urls import path
# from rest_framework_simplejwt.views import TokenRefreshView
# from .views import CustomTokenObtainPairView

# from .views import (
#     CustomTokenObtainPairView,
#     RegisterView,
#     ChangePasswordView,
#     RequestPasswordResetView,
#     PasswordResetConfirmView
# )

# urlpatterns = [
#     path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
#     path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
#     path('register/', RegisterView.as_view(), name='register'),
#     path('change-password/', ChangePasswordView.as_view(), name='change_password'),
#     path('request-reset-password/', RequestPasswordResetView.as_view(), name='request_reset_password'),
#      path('request-reset/', RequestPasswordResetView.as_view(), name='request-reset'),
#     path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
#     path('request-reset-password/', RequestPasswordResetView.as_view(), name='request_reset_password'),
#     path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
# ]
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    RegisterView,
    ChangePasswordView,
    RequestPasswordResetView,
    PasswordResetConfirmView,
    ListUsersView,
    LoginView
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('request-reset-password/', RequestPasswordResetView.as_view(), name='request_reset_password'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
    path('users/', ListUsersView.as_view(), name='user_list'),  # ✅ Faltaba este
    path("login/", LoginView.as_view(), name="login")
]
