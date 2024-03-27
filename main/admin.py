from django.contrib import admin
from .models import Inventory, Lab, Category, Item

# Register your models here.

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
	list_display = ('item', 'lab', 'category', 'quantity', 'threshold_low', 'threshold_high')
	ordering = ('item__name',)
	search_fields = ('item__name', 'category__name', 'lab__name',)

@admin.register(Lab)
class LabAdmin(admin.ModelAdmin):
	list_display = ('name',)
	ordering = ('name',)
	search_fields = ('name',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ('name',)
	ordering = ('name',)
	search_fields = ('name',)

@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
	list_display = ('name', 'serial_no', 'description')
	ordering = ('name',)
	search_fields = ('name', 'serial_no', 'description',)