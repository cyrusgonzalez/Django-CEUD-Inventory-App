from django.urls import path
from . import views

app_name = "main"
urlpatterns = [
path("", views.inventorypage, name="inventorypage"),
path("additem/", views.additem, name='additem'),
path("changeitem/", views.changeitem, name='changeitem'),
path("edititem/<int:item_id>", views.edititem, name='edititem'),
path("deleteitem/<int:item_id>/", views.deleteitem, name='deleteitem'),
path("changeuser/", views.changeuser, name="changeuser"),
path("deleteuser/<item_id>/", views.deleteuser, name='deleteuser'),
path("increment/<item_id>/", views.increment, name="increment"),
path("increment10/<item_id>/", views.increment10, name="increment10"),
path("decrement/<item_id>/", views.decrement, name="decrement"),
path("decrement10/<item_id>/", views.decrement10, name="decrement10"),
]