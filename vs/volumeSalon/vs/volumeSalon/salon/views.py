from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib import auth
from django.utils import html
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.forms import ModelForm
from django.conf import settings
from .models import Client, Category, Product, BoutiqueItem, Service, Stylist

def index(request):
    context = {'nbar': 'home',
                'heading': 'Volume Salon POS',
                'mission': 'Making you beautiful'
            }
    return render(request, 'salon/index.html', context)


def viewClients(request):
    all_clients = Client.objects.all()
    template = loader.get_template('salon/viewclients.html')
    context = {
        'all_clients': all_clients,
        }
    return HttpResponse(template.render(context, request))

def product_list(request):
    all_products = Product.objects.all()
    template = loader.get_template('salon/product_list.html')
    context = {
        'all_products': all_products,
        }
    return HttpResponse(template.render(context, request))

def product_detail(request):
    all_products = Product.objects.all()
    template = loader.get_template('salon/product_detail.html')
    context = {
        'all_products': all_products,
        }
    return HttpResponse(template.render(context, request))

def login(request):
    context = {
        'title': 'Login',
        'heading': 'Login',
    }
    return render(request, 'salon/login.html', context)


def loginProcess(request):
    errors = []
    context = {}
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        if not username:
            errors.append('Username is required')
        if not password:
            errors.append('Password is required')

        if not errors:
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user) #adds session info for user
                    context = {
                        'heading': 'Volume Salon POS',
                        'title': 'Volume Salon',
                    }
                    return render(request, 'salon/index.html', context)
                else:
                    errors.append('This account has been disabled.')
            else:
                errors.append('Invalid username or password.')

        context['errors'] = errors
        return render(request, 'salon/login.html', context)
    else:
        login_view(request)


def logout(request):
    logout(request)
    context = {
        'heading': 'Successfully logged out.',
        'content': '<a href="/login/">Log back in again.</a>',
        'title': 'Logout Successful'
    }
    return render(request, 'salon/index.html', context)
