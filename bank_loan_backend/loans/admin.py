from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, LoanRequest, LoanRepayment

# If your loan tiers/products are stored in a database model, uncomment the line below:
from .models import Product


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Extends the default UserAdmin wrapper to expose the custom fintech 
    role parameters cleanly inside the management layout.
    """
    list_display = ('id', 'username', 'email', 'role', 'is_staff', 'is_active')
    list_filter = ('role', 'is_staff', 'is_active')
    search_fields = ('username', 'email')
    ordering = ('id',)
    
    # Ensures the custom 'role' field shows up in the detail edit view split
    fieldsets = UserAdmin.fieldsets + (
        ('Fintech Core Profile', {'fields': ('role',)}),
    )
    # Ensures the custom 'role' field shows up when creating a user via Admin
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Fintech Core Profile', {'fields': ('role',)}),
    )


@admin.register(LoanRequest)
class LoanRequestAdmin(admin.ModelAdmin):
    """
    Tracks customer capital requests, justification details, and approval states.
    """
    list_display = ('id', 'get_username', 'amount', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('user__username', 'purpose', 'id')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

    @admin.display(ordering='user__username', description='Applicant')
    def get_username(self, obj):
        return obj.user.username


@admin.register(LoanRepayment)
class LoanRepaymentAdmin(admin.ModelAdmin):
    """
    Monitors incoming payment remittances linked back to active approved credit lines.
    """
    list_display = ('id', 'get_loan_reference', 'amount_paid', 'payment_date')
    list_filter = ('payment_date',)
    search_fields = ('loan__id', 'loan__user__username')
    ordering = ('-payment_date',)
    readonly_fields = ('payment_date',)

    @admin.display(ordering='loan__id', description='Loan Ref')
    def get_loan_reference(self, obj):
        return f"MGP-00{obj.loan.id} ({obj.loan.user.username})"


# --- OPTIONAL: UNCOMMENT IF YOU HAVE A PRODUCT MODEL FOR THE SERVICES PAGE ---
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'interest_rate')
    search_fields = ('name', 'description')
    ordering = ('id',)