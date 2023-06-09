from django.urls import path
from rest_framework_simplejwt import views as jwt_views

from registrationprofile.views import RegistrationView, RegistrationValidationView

urlpatterns = [
    path("token/", jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("token/refresh/", jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path("token/verify/", jwt_views.TokenVerifyView.as_view(), name='token_refresh'),
    path("registration/", RegistrationView.as_view()),
    path("registration/validation/", RegistrationValidationView.as_view()),
]
