from django.http import HttpResponse

def index(request):
        return HttpResponse("<title>volumeSalon inventory</title></head><body><h1>This is the index page</h1><p>This is a paragraph.</p></body></html>")
