from django.contrib import admin
from daterange_filter.filter import DateRangeFilter

from .models import Category
from .models import Product
from .models import Client
from .models import BoutiqueItem
from .models import Stylist
from .models import Service
from .models import Invoice
from .models import Transaction
from .models import Taxes


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category, CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'retail_cost', 'salon_cost', 'in_stock', 'minimum_in_stock', 'created', 'updated']
    list_filter = ['category', 'name', 'created']
    list_editable = ['retail_cost', 'salon_cost', 'in_stock', 'minimum_in_stock']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Product, ProductAdmin)

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'notes', 'phone_number')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['name']
    list_editable = ['phone_number']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Client, ClientAdmin)

class BoutiqueItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'retail_price']
    list_filter = ['name']
    list_editable = ['retail_price']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(BoutiqueItem, BoutiqueItemAdmin)

class StylistAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
admin.site.register(Stylist, StylistAdmin)

class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name']
    list_filter = ['name']
admin.site.register(Service, ServiceAdmin)

class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['price', 'name', 'transactionId', 'created']
    list_filter = ['transactionId', 'name', ('created', DateRangeFilter)]
admin.site.register(Invoice, InvoiceAdmin)

class TransactionAdmin(admin.ModelAdmin):
    list_display = ['transactionId', 'total', 'subTotal', 'taxes', 'discount']
    list_filter = ['transactionId', ('created', DateRangeFilter)]
admin.site.register(Transaction, TransactionAdmin)

class TaxesAdmin(admin.ModelAdmin):
    list_display = ['taxRate', 'created']
admin.site.register(Taxes, TaxesAdmin)
