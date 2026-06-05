from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('manager', 'Manager'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='customer')

    # --- ADD THESE TWO OVERRIDES TO RESOLVE THE CLASH ---
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='loans_user_groups',  # Custom unique reverse accessor
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='loans_user_permissions',  # Custom unique reverse accessor
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return f"{self.username} ({self.role})"
    
class LoanRequest(models.Model):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='loans')
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    purpose = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_repaid(self):
        return sum(r.amount_paid for r in self.repayments.all())

    @property
    def remaining_balance(self):
        return self.amount - self.total_repaid
    
    def __str__(self):
        return f"Loan APX-00{self.id} | {self.user.username} | {self.status}"

class LoanRepayment(models.Model):
    loan = models.ForeignKey(LoanRequest, on_delete=models.CASCADE, related_name='repayments')
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Repayment ID {self.id} -> Loan Ref APX-00{self.loan.id}"
    
class Product(models.Model):
    """
    Stores available credit tiers, base interest rates, and descriptions 
    rendered dynamically on the services screen.
    """
    name = models.CharField(max_length=100, verbose_name="Facility Name")
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2, verbose_name="Interest Rate (%)")
    description = models.TextField(verbose_name="Description Framework")

    def __str__(self):
        return f"{self.name} ({self.interest_rate}%)"