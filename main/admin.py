from django.contrib import admin
from .models import Inventory

# Register your models here.

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
	list_display = ('item_name','ser_prod_no','category_inf','lab_name_no','quantity_of',)#'threshold_val',
	ordering = ('item_name',)
	search_fields = ('item_name','category_inf','lab_name_no',)
