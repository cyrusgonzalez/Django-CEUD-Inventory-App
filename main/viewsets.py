from rest_framework import viewsets
from .models import Item, Lab, Category, Inventory
from .serializers import ItemSerializer, LabSerializer, CategorySerializer, InventorySerializer, InventoryCreateUpdateSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class LabViewSet(viewsets.ModelViewSet):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return InventoryCreateUpdateSerializer
        return InventorySerializer
