import datetime

from django.db import models
from django.utils import timezone

class Stylist(models.Model):
    stylist_name = models.CharField(max_length=200, primary_key=True)
    stylist_description = models.CharField(max_length=500)
    def __self__(self):
        return self.stylist_name

class Product(models.Model):
    product_name = models.CharField(max_length=200, primary_key=True)
    starting_price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    def __self__(self):
        return self.product_name
