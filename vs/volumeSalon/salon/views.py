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
from .models import Client, Category, Product, BoutiqueItem, Stylist, Service, Invoice, Transaction, Taxes
from .forms import AccountForm, AccountEditForm
import json
from random import randint

def index(request):
    context = {'nbar': 'home',
                'heading': 'Volume Salon Checkout',
                'mission': 'Making you beautiful'
            }
    return render(request, 'salon/index.html', context)

def createTransactionId():
    tid=""
    str="abcdefghijklmnopqrstuvwxyz0123456789"
    for i in range(0,5):
        tid = tid + str[randint(0, len(str)-1)]
    invoiceDB = Invoice.objects.all().filter(transactionId=tid)
    if invoiceDB:
        print("recursiveTransactionId")
        return createTransactionId()

    return tid

@login_required(login_url='/login/')
def POS(request):
    all_services = Service.objects.all()
    all_products = Product.objects.all()
    all_stylists = Stylist.objects.all()
    all_boutiqueItems = BoutiqueItem.objects.all()

    if request.method == 'POST':
        #print(request.body)
        str=((request.body).decode('utf-8'))
        req = json.loads(str)
        data = req["items"]
        tran = req["transaction"]
        tid=createTransactionId()

        for i in range (0, len(data)):
            if data[i]['ptype'] == 'product':
                p = Product.objects.get(id=data[i]["id"])
                if p.in_stock <= 0:
                    return HttpResponse(json.dumps({'fail' : p.name}))
                p.in_stock -= 1
                p.save()

        for i in range (0, len(data)):
            invoiceDB = Invoice(itemId=data[i]['id'], price=data[i]['price'], name=data[i]['name'], transactionId=tid, isStylist=data[i]['isStylist'])
            invoiceDB.save()
        transactionDB = Transaction(transactionId=tid, total=tran["total"], subTotal=tran["subTotal"], taxes=tran["taxes"], discount=tran["discount"])
        transactionDB.save()

        resp = {}
        resp['success'] = "true"
        return HttpResponse(json.dumps(resp))


    t = Taxes.objects.order_by('-id').latest('created')
    context = {'nbar': 'home',
                'heading': 'Volume Salon Checkout',
                'mission': 'Making you beautiful',
                'all_services': all_services,
                'all_products': all_products,
                'all_stylists': all_stylists,
                'all_boutiqueItems': all_boutiqueItems,
                'taxRate': t.taxRate,
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

@login_required(login_url='/login/')
def productInfo(request):
    all_products = Product.objects.all()

    if request.method == 'POST':
        c = Product.objects.all().filter(sku=request.POST.get('q'))
        context = {'nbar': 'home',
                    'heading': 'Volume Salon Client List',
                    'mission': 'Making you beautiful',
                    'all_products': c
                }
        return render(request, 'salon/productInfo.html', context)

    context = {'nbar': 'home',
                'heading': 'Volume Salon Client List',
                'mission': 'Making you beautiful',
                'all_products': all_products
            }
    return render(request, 'salon/productInfo.html', context)

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
