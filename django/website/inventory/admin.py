from django.contrib import admin

from .models import Shampoo
from .models import Conditioner
from .models import Styling_Products
from .models import Boutique_Items

admin.site.register(Shampoo)
admin.site.register(Conditioner)
admin.site.register(Styling_Products)
admin.site.register(Boutique_Items)
