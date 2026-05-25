# loans/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Auth routing paths connected directly to your frontend pages
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    path('products/', views.product_list, name='product_list'),
    # Core system transactional tracks
    path('loans/', views.loan_request_list_create, name='loan_list_create'),
    path('loans/<int:loan_id>/status/', views.update_loan_status, name='update_loan_status'),
    path('loans/<int:loan_id>/payments/', views.track_payments, name='track_payments'),
]