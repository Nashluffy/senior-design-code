from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import CreateView
from django.urls import reverse_lazy
from django.shortcuts import render
from . import urls
from .models import Document


<<<<<<< HEAD
def index(request):
    return render(request, "index.html")
    
=======
#def index(request):
#    return render(request, "index.html")


class DocumentCreateView(CreateView):
    model = Document
    fields = ['upload', ]
    success_url = reverse_lazy('home')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        documents = Document.objects.all()
        context['documents'] = documents
        return context
>>>>>>> 61bf7cd8159981db35addc3b35efb8b1a3680cf7
