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
    path("addlab/", views.addlab, name='addlab'),
    path("addcategory/", views.addcategory, name='addcategory'),
    path("edititem/<int:item_id>/", views.edititem, name='edititem'),
    path("editlab/<int:lab_id>/", views.editlab, name='editlab'),
    path("editcategory/<int:category_id>/", views.editcategory, name='editcategory'),
    path("deleteitem/<int:item_id>/", views.deleteitem, name='deleteitem'),
    path("deletelab/<int:lab_id>/", views.deletelab, name='deletelab'),
    path("deletecategory/<int:category_id>/", views.deletecategory, name='deletecategory'),
]