
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    session_login, session_logout, csrf_token_view, csrf_test,
    RegisterView, ChangePasswordView, RequestPasswordResetView,
    UserViewSet  # ← este es nuevo
)

router = DefaultRouter()
router.register(r'usuarios', UserViewSet, basename='usuario')

urlpatterns = [
    path("session-login/", session_login, name="session-login"),
    path("session-logout/", session_logout, name="session-logout"),
    path("csrf/", csrf_token_view),
    path("csrf-test/", csrf_test),
    path("register/", RegisterView.as_view(), name="register"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("request-reset-password/", RequestPasswordResetView.as_view(), name="request-reset-password"),
    path('', include(router.urls)),

]
#urlpatterns += router.urls
