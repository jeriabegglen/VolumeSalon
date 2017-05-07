from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'salon/', views.product_list, name='product'),
    url(r'^(?P<id>\d+)/(?P<slug>[-\w]+)/$',
        views.product_detail,
        name='product_detail'),
    url(r'^login', views.login, name='login'),
    url(r'logout/', views.logout, name='logout'),
    url(r'clients/', views.viewClients, name='clients'),
    url(r'POS/', views.POS, name='POS'),
    url(r'account/', views.account, name='account'),
    url(r'dashboard/', views.dashboard, name='dashboard'),
    url(r'productInfo/', views.productInfo, name='productInfo'),
]
