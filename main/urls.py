from django.urls import path, include
from . import views
from . import viewsets
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'items', viewsets.ItemViewSet)
router.register(r'labs', viewsets.LabViewSet)
router.register(r'categories', viewsets.CategoryViewSet)
router.register(r'inventories', viewsets.InventoryViewSet)

app_name = "main"
urlpatterns = [
    path("", views.inventorypage, name="inventorypage"),
    path("api/", include(router.urls)),
    path("addinventory/", views.addinventory, name="addinventory"),
    path("additem/", views.additem, name='additem'),
    path("edititem/<int:item_id>", views.edititem, name='edititem'),
    path("deleteitem/<int:item_id>/", views.deleteitem, name='deleteitem'),
    path("deleteuser/<item_id>/", views.deleteuser, name='deleteuser'),
    path("increment/<item_id>/", views.increment, name="increment"),
    path("increment10/<item_id>/", views.increment10, name="increment10"),
    path("decrement/<item_id>/", views.decrement, name="decrement"),
    path("decrement10/<item_id>/", views.decrement10, name="decrement10"),
]