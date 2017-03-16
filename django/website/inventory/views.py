from django.http import HttpResponse

def index(request):
        return HttpResponse("Hey there, here is the inventory index.")
