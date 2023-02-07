from rest_framework import serializers
from .models import Item, TodoList

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class TodoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoList
        fields = '__all__'