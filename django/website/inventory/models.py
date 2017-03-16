import datetime

from django.db import models
from django.utils import timezone

class Item(models.Model):
    item_name = models.CharField(max_length=200, primary_key=True)
    manufacturer = models.CharField(max_length=200)
    salon_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    retail_cost = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    quantity_in_stock = models.IntegerField(max_length=50)
    min_in_stock = models.IntegerField(max_length=50)
    sku = models.IntegerField(max_length=50)
    size = models.IntegerField(max_length=50)
    pur_date = models.DateTimeField('date purchased')
    employee = models.CharField(max_length=200)
    def __self__(self):
        return self.item_name

class SalonItem(models.Model):
    salon_item_name = models.CharField(max_length=200, primary_key=True)
    s_price = models.IntegerField(max_length=50)
    r_price = models.IntegerField(max_length=50)
    purchased_date = models.DateTimeField('date purchased')
    employee = models.CharField(max_length=200)
    def __str__(self):
        return self.salon_item_name
