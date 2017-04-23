from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),


]

    #url(r'^grade/([0-9]*)', views.saveGrade, name='grade'),
    #url(r'^$', views.viewClients, name='viewClients'),
    #url(r'^login/$', auth_views.login, name='login'),
    #url(r'^logout/$', auth_views.logout, name='logout'),
    #url(r'^admin/', admin.site.urls)
