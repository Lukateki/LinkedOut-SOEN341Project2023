from django.urls import path
from .views import TodoListListView, say_hello, ItemListView

# URL Config
urlpatterns = [
    # path('hello/', views.say_hello),
    path('to-do-list', TodoListListView.as_view(), name='to-do-list-list'),
    path('item', ItemListView.as_view(), name='item-list')
]