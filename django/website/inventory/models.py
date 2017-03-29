import datetime

from django.db import models
from django.utils import timezone

class Shampoo(models.Model):
    shampoo_name = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    salon_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    retail_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    quantity_in_stock = models.IntegerField(max_length=50)
    minimum_in_stock = models.IntegerField(max_length=50)
    sku = models.IntegerField(max_length=50)
    size = models.IntegerField(max_length=50)

    def __str__(self):
        return self.shampoo_name

class Boutique_Items(models.Model):
    boutique_item_name = models.CharField(max_length=200, primary_key=True)
    salon_price = models.IntegerField(max_length=50)
    retail_price = models.IntegerField(max_length=50)
    def __str__(self):
        return self.boutique_item_name

class Conditioner(models.Model):
    conditioner_name = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    salon_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    retail_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    quantity_in_stock = models.IntegerField(max_length=50)
    minimum_in_stock = models.IntegerField(max_length=50)
    sku = models.IntegerField(max_length=50)
    size = models.IntegerField(max_length=50)
    def __str__(self):
        return self.conditioner_name

class Styling_Products(models.Model):
    styling_product_name = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    salon_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    retail_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    quantity_in_stock = models.IntegerField(max_length=50)
    minimum_in_stock = models.IntegerField(max_length=50)
    sku = models.IntegerField(max_length=50)
    size = models.IntegerField(max_length=50)

    def __str__(self):
        return self.styling_product_name
