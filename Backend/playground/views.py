from django.shortcuts import render
from django.http import HttpResponse
from .serializers import ItemSerializer, TodoListSerializer
from .models import Item, TodoList
from rest_framework import generics


# Create your views here.
def say_hello(request):
    x = 1
    y = 2
    return render(request, 'hello.html', {'name': "Mark"})

class ItemListView(generics.ListAPIView):
    # queryset = Item.objects.all()
    # serializer_class = ItemSerializer
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        # usernames = [user.username for user in User.objects.all()]
        return Response({"item": "circle"})

class TodoListListView(generics.ListAPIView):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
