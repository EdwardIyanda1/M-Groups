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
        
    try: # Outer try block opened
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({'error': 'Both email and password fields are required.'}, status=400)

        # 1. Attempt email lookup
        try:
            user_profile = User.objects.get(email=email)
            resolved_username = user_profile.username
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid email or password mapping.'}, status=401)
        except User.MultipleObjectsReturned:
            return JsonResponse({
                'error': 'Multiple accounts share this email address. Integrity compromised.'
            }, status=400)

        # 2. Execute verification checks
        user = authenticate(request, username=resolved_username, password=password)
        
        if user is not None:
            if user.is_active:
                login(request, user)
                return JsonResponse({
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'role': getattr(user, 'role', 'customer')
                }, status=200)
            else:
                return JsonResponse({'error': 'This user account is flagged deactivated.'}, status=403)
        else:
            return JsonResponse({'error': 'Invalid email or password mapping.'}, status=401)
            
    # FIXED: Added the missing outer except block to close the try layout cleanly
    except Exception as e:
        return JsonResponse({'error': f'Internal Server Error: {str(e)}'}, status=500)
        
@csrf_exempt
def loan_request_list_create(request):
    if request.method == 'GET':
        loans = LoanRequest.objects.all().values('id', 'user__username', 'amount', 'purpose', 'status', 'created_at')
        return JsonResponse(list(loans), safe=False)
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