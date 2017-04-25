from django.contrib import admin

from .models import Category
from .models import Product
from .models import Client
from .models import BoutiqueItem
from .models import Stylist
from .models import Service

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Category, CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'retail_cost', 'salon_cost', 'created', 'updated', 'in_stock', 'minimum_in_stock']
    list_filter = ['name', 'created', 'updated']
    list_editable = ['retail_cost', 'salon_cost', 'in_stock', 'minimum_in_stock']
    prepopulated_fields = {'slug': ('name',)}
admin.site.register(Product, ProductAdmin)

class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'notes', 'phone_number')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ['name', 'notes']
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
    list_display = ['service', 'starting_price']
    list_filter = ['service']
admin.site.register(Service, ServiceAdmin)
