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
from .forms import AccountForm, AccountEditForm

def index(request):
    context = {'nbar': 'home',
                'heading': 'Volume Salon POS',
                'mission': 'Making you beautiful'
            }
    return render(request, 'salon/index.html', context)

@login_required(login_url='/login/')
def POS(request):
    all_services = Service.objects.all()
    if request.GET.get('dropdown1'):
        s = Service.objects.filter(service=request.GET["dropdown1"])
        context = {'nbar': 'home',
                    'heading': 'Volume Salon POS',
                    'mission': 'Making you beautiful',
                    'sp': s[0],
                    'all_services': all_services
                }
        return render(request, 'salon/pos.html', context)
    if request.GET.get('service'):
        s = Service.objects.filter(service=request.GET["service"])
        print(request.GET["new_price"])
        context = {'nbar': 'home',
                    'heading': 'Volume Salon POS',
                    'mission': 'Making you beautiful',
                    'sp': s[0],
                    'all_services': all_services,
                    'new_price': request.GET["new_price"]
                }
        return render(request, 'salon/pos.html', context)
    '''cname = request.POST.get('dropdown1')'''
    context = {'nbar': 'home',
                'heading': 'Volume Salon POS',
                'mission': 'Making you beautiful',
                'all_services': all_services
            }

    return render(request, 'salon/pos.html', context)

@login_required(login_url='/login/')
def viewClients(request):
    all_clients = Client.objects.all()
    print(request.GET)
    if request.GET.get('cname'):
        c = Client(name=request.GET["cname"], phone_number=request.GET["cphone"], notes=request.GET["cnotes"])
        c.save()
    context = {'nbar': 'home',
                'heading': 'Volume Salon Client List',
                'mission': 'Making you beautiful',
                'all_clients': all_clients
            }
    return render(request, 'salon/viewclients.html', context)

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
    auth.logout(request)
    return HttpResponseRedirect(reverse('index'))

def login(request):
    # print('site = ', request.get_host())
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        valid = False
        error_message = []
        if not username or not password:
            error_message = ['You must fill in all of the fields.']
        else:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    # correct password, and the user is marked active
                    auth.login(request, user)
                    request.session['user_id'] = user.id
                    valid = True
                else:
                    error_message = ["User accocount has not been activated."]

            else:
                error_message = ["Invalid username or password."]

        if valid:
            return HttpResponseRedirect(reverse('dashboard'))
        else:
            return render(request,
                          'salon/login.html',
                          {
                           'errorMessage': ' '.join(error_message),
                           'username': username,
                           'password': password,
                           })

    else:
        # No context variables to pass to the template system, hence blank
        # dictionary object...
        return render(request,
                      'salon/login.html',
                      {
                          'pageTitle': 'Login',
                      })


@login_required(login_url='/login/')
def account(request):
    errorMessage = []
    errorType = 'danger'
    if request.method == 'POST':
        accForm = AccountEditForm(instance=request.user,
                                 data=request.POST,
                                 )
        if accForm.is_valid():
            accForm.save()
            errorMessage.append('Account update successful!')
            errorType = 'success'
        else:
            for k in accForm.errors:
                errorMessage.append(accForm.errors[k])
    else:
        accForm = AccountEditForm(instance=request.user)

    return render(request, 'salon/account.html',
                    {
                        'pageTitle': 'Account Update',
                        'panelTitle': 'Account Update',
                        'accountForm': accForm,
                        'errorMessage': '<br>'.join(errorMessage),
                        'errorType': errorType
                    })


@login_required
def dashboard(request):
    context = {
        'pageTitle': 'Dashboard',
        'panelTitle': 'Dashboard',
        'panelBody': '<strong>Welcome to Volume Salon Checkout and Client List</strong>'
    }
    return render(request, 'salon/static.html', context)
