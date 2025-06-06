
# from django.urls import path, include
# from .views import session_login
# from rest_framework.routers import DefaultRouter

# from .views import (
#     RegisterView,
#     ChangePasswordView,
#     RequestPasswordResetView,
#    # PasswordResetConfirmView,
#     ListUsersView,
#     session_login,       # Login por sesión
#     session_logout,       # Logout por sesión
#     csrf_token_view,
#     csrf_test,
#     UserViewSet,
# )

# router = DefaultRouter()
# router.register(r'users', UserViewSet, basename='user')


# urlpatterns = [
#     path('register/', RegisterView.as_view(), name='register'),
#     path('change-password/', ChangePasswordView.as_view(), name='change_password'),
#     path('request-reset-password/', RequestPasswordResetView.as_view(), name='request_reset_password'),
#     #path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='reset_password_confirm'),
#     path('users/', ListUsersView.as_view(), name='user_list'),
#     path("session-login/", session_login, name="session-login"),
#     path("session-logout/", session_logout, name="session-logout"),
#     path("csrf/", csrf_token_view),
#     path("csrf-test/", csrf_test, name="csrf-test"),
#     path("", include(router.urls)),  # Agrega las rutas del viewset
    
# ]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    session_login, session_logout, csrf_token_view, csrf_test,
    RegisterView, ChangePasswordView, RequestPasswordResetView,
    UserViewSet  # ← este es nuevo
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path("session-login/", session_login, name="session-login"),
    path("session-logout/", session_logout, name="session-logout"),
    path("csrf/", csrf_token_view),
    path("csrf-test/", csrf_test),
    path("register/", RegisterView.as_view(), name="register"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("request-reset-password/", RequestPasswordResetView.as_view(), name="request-reset-password"),
    path('', include(router.urls)),

] + router.urls
