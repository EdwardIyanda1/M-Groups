from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
# FIXED: Imported login alongside authenticate to prevent NameError runtime crashes
from django.contrib.auth import authenticate, login 
from django.shortcuts import get_object_or_404
import json
from .models import User, LoanRequest, LoanRepayment, Product

@csrf_exempt
def register_user(request):
    """
    Receives multi-stage payload arrays and commits a new User record 
    dynamically into the database.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            
            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username identifier already allocated."}, status=400)
                
            # Create a real, dynamic user instance in your database table
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=data.get('firstName', ''),
                last_name=data.get('lastName', '')
            )
            # Default first user as manager for testing, otherwise customer role
            if User.objects.count() == 1 or 'admin' in username.lower():
                user.role = 'manager'
            else:
                user.role = 'customer'
            user.save()
            
            return JsonResponse({"message": "User instance initialized successfully."}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
        
@csrf_exempt
def login_user(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed.'}, status=405)
    
    try:
        # Only load the body once
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Email and password required.'}, status=400)

        # 1. Attempt authentication
        user = authenticate(request, username=email, password=password)
        
        # 2. Fallback: If user is None, try looking up by email specifically
        if user is None:
            try:
                user_obj = User.objects.get(email=email)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found.'}, status=404)

        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse({
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': getattr(user, 'role', 'customer'),
                    'is_staff': user.is_staff
                }, status=200)
            else:
                return JsonResponse({'error': 'Account deactivated.'}, status=403)
        
        return JsonResponse({'error': 'Invalid credentials.'}, status=401)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format.'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def loan_request_list_create(request):
    if request.method == 'GET':
        # Fetch loans and include calculation
        loans = LoanRequest.objects.all()
        data = []
        for loan in loans:
            data.append({
                'id': loan.id,
                'user__username': loan.user.username,
                'amount': float(loan.amount),
                'purpose': loan.purpose,
                'status': loan.status,
                'remaining_balance': float(loan.remaining_balance),
                'created_at': loan.created_at
            })
        return JsonResponse(data, safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        user = get_object_or_404(User, id=data.get('user_id'))
        new_loan = LoanRequest.objects.create(user=user, amount=data.get('amount'), purpose=data.get('purpose'))
        return JsonResponse({"message": "Loan reference allocated successfully.", "id": new_loan.id}, status=201)

@csrf_exempt
def update_loan_status(request, loan_id):
    if request.method == 'PATCH':
        data = json.loads(request.body)
        loan = get_object_or_404(LoanRequest, id=loan_id)
        loan.status = data.get('status', loan.status)
        loan.save()
        return JsonResponse({"message": f"Loan tracking vector state set to {loan.status}."})
    
@csrf_exempt
def track_payments(request, loan_id):
    if request.method == 'GET':
        repayments = LoanRepayment.objects.filter(loan_id=loan_id).values('id', 'amount_paid', 'payment_date')
        return JsonResponse(list(repayments), safe=False)
    elif request.method == 'POST':
        data = json.loads(request.body)
        loan = get_object_or_404(LoanRequest, id=loan_id)
        repayment = LoanRepayment.objects.create(loan=loan, amount_paid=data.get('amount_paid'))
        return JsonResponse({"message": "Financial remittance logged completely.", "id": repayment.id}, status=201)
    
def product_list(request):
    """
    Queries all active loan products from the database dynamically 
    and returns them as a JSON array for the frontend catalog.
    """
    if request.method == 'GET':
        products = Product.objects.all().values('id', 'name', 'interest_rate', 'description')
        return JsonResponse(list(products), safe=False)