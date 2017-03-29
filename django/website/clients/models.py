from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Client(models.Model):
    client_name = models.CharField(max_length=200, primary_key=True)
    description = models.CharField(max_length=500)
    phone_number = models.IntegerField(max_length=10)
    def __str__(self):
        return self.client_name
