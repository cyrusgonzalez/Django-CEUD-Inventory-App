from django.contrib import admin
from .models import Inventory

# Register your models here.

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
	list_display = ('item', 'lab', 'category', 'quantity', 'threshold_low', 'threshold_high')
	ordering = ('item__name',)
	search_fields = ('item__name', 'category__name', 'lab__name',)
