from django.contrib import admin

from .models import Stylist
from .models import Service

admin.site.register(Stylist)
admin.site.register(Service)
