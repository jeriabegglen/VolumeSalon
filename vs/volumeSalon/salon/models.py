import datetime
from django.db import models
from django.core.urlresolvers import reverse
from django.utils import timezone
'''from phonenumber_field.modelfields import PhoneNumberField'''

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.CharField(max_length=200, db_index=True, unique=True)
    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'
    def get_absolute_url(self):
        return reverse('salon:product_list_by_category', args=[self.slug])
    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products')
    name = models.CharField(max_length=200, db_index=True)
    slug = models.CharField(max_length=200, db_index=True, unique=True)
    description = models.TextField(blank=True)
    manufacturer = models.CharField(max_length=200)
    salon_cost = models.DecimalField(max_digits=10, decimal_places=2)
    retail_cost = models.DecimalField(max_digits=10, decimal_places=2)
    in_stock = models.PositiveIntegerField()
    minimum_in_stock = models.PositiveIntegerField()
    sku = models.IntegerField()
    size = models.IntegerField()
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ('name',)
        verbose_name = 'product'
        verbose_name_plural = 'products'
        index_together = (('id', 'slug'),)
    def get_absolute_url(self):
        return reverse('salon:product_detail', args=[self.id, self.slug])
    def __str__(self):
        return self.name

class BoutiqueItem(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    category = models.ForeignKey(Category, related_name='boutique'+'item')
    slug = models.CharField(max_length=200, db_index=True, unique=True)
    retail_price = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        ordering = ('name',)
        verbose_name = 'boutique'+' item'
        verbose_name_plural = 'boutique'+' items'
        index_together = (('id', 'slug'),)
    def get_absolute_url(self):
        return reverse('salon:product_detail', args=[self.id, self.slug])
    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    notes = models.TextField()
    slug = models.CharField(max_length=200, db_index=True)
    phone_number = models.IntegerField(blank=True, null=True)
    class Meta:
        ordering = ('name',)
        verbose_name = 'client'
        verbose_name_plural = 'clients'
    def get_absolute_url(self):
        return reverse('salon:product_detail', args=[self.id, self.slug])
    def __str__(self):
        return self.name

class Stylist(models.Model):
    name = models.CharField(max_length=200, primary_key=True)
    class Meta:
        ordering = ('name',)
        verbose_name = 'stylist'
        verbose_name_plural = 'stylists'
    def __str__(self):
        return self.name

class Service(models.Model):
    service = models.CharField(max_length=200, primary_key=True)
    starting_price = models.DecimalField(max_digits=10, decimal_places=2)
    class Meta:
        ordering = ('service',)
        verbose_name = 'service'
        verbose_name_plural = 'services'
    def __str__(self):
        return self.service
