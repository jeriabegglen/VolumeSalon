from django.db import models

class Stylist(models.Model):
    first_name = models.CharField(max_length=200, primary_key=True)
    last_name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=500)
    def __str__(self):
        return self.first_name


class Service(models.Model):
    service_name = models.CharField(max_length=200, primary_key=True)
    starting_price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    def __str__(self):
        return self.service_name
