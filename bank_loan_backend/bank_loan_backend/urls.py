from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # System Admin Interface
    path('api/', include('loans.urls')), # Points directly to your custom API paths
]