"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from project import settings

schema_view = get_schema_view(
    openapi.Info(
        title="APi Motion",
        default_version='v1',
        description="Example",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="learn@propulsionacademy.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,  # Set to False restrict access to protected endpoints
    permission_classes=(permissions.AllowAny,),  # Permissions for docs access
)

urlpatterns = [
    path('backend/api/docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    path('backend/api/admin/', admin.site.urls),

    path("backend/api/social/posts/", include('post.urls')),

    path("backend/api/users/", include('user.urls')),
    path("backend/api/social/", include('user.urls')),

    path("backend/api/auth/", include('registrationprofile.urls')),


    path("backend/api/comments/", include('comment.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
