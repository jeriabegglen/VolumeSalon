from django.contrib import admin

from .models import Category
from .models import Product
from .models import Client
from .models import BoutiqueItem

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category, CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'description', 'retail_cost', 'salon_cost', 'created', 'updated', 'in_stock', 'minimum_in_stock']
    list_filter = ['name', 'created', 'updated']
    list_editable = ['retail_cost', 'salon_cost', 'in_stock', 'minimum_in_stock']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Product, ProductAdmin)

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'notes', 'phone_number')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['name', 'notes']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Client, ClientAdmin)

class BoutiqueItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'retail_price']
    list_filter = ['name']
    list_editable = ['retail_price']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(BoutiqueItem, BoutiqueItemAdmin)
