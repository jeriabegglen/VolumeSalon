from django.shortcuts import render, get_object_or_404
from .models import Category, Product, Client, BoutiqueItem

def product_list(request, category_slug=None):
    category = None
    categories = Category.objects.all()
    products = Product.objects.filter()
    if category_slug:
        category = get_object_or_404(Category, slug=category_slug)
        products = products.filter(category=category)
    return render(request,
                  'salon/product/list.html',
                  {'category': category,
                  'categories': categories,
                  'products': products })

def product_detail(request, id, slug):
    product = get_object_or_404(Product,
                                id=id,
                                slug=slug,)
    return render(request, 'salon/product/detail.html', {'product': product})






from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from .models import Client

def index(request):
    context = {
        'heading': "Welcome to Danielle's Client List",
        'title': 'Client List'
    }
    if not request.user.is_authenticated():
        context['content'] = 'Must <a href="/login/">login</a> to use the application.',
    #return HttpResponse(html)
    return render(request, 'salon/index.html', context)



@login_required(login_url='/login/')
def showClients(request):
    clients = Client.objects.order_by("client_name")
    data = ""
    for client_name in clients:
        data += str(client.id) + "  " + client.client_name + "  " + str(client.notes) + "<br>"

    return HttpResponse(data)


def addClients(request):
    data = ""
    for client_name in clients:
        data += str(client.id) + "  " + client.client_name + "  " + str(client.notes) + "<br>"

    return HttpResponse(data)



def login_view(request):
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
                        'heading': "Welcome Danielle's Client List",
                        'title': 'Client List',
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


def logout_view(request):
    logout(request)
    context = {
        'heading': 'Successfully logged out.',
        'content': '<a href="/login/">Log back in again.</a>',
        'title': 'Logout Successful'
    }
    return render(request, 'salon/index.html', context)
