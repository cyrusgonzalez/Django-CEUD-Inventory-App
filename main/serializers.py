from rest_framework import serializers
from .models import Item, Lab, Category, Inventory

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class InventorySerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    lab = LabSerializer()
    category = CategorySerializer()

    class Meta:
        model = Inventory
        fields = '__all__'

class InventoryCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'
