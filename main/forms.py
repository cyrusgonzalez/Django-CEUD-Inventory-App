from django import forms
from .models import Inventory
import django_filters

class Inventoryform(forms.ModelForm):

	class Meta:
		model = Inventory
		fields = ['item_name','ser_prod_no','descript_inf',
			'category_inf','lab_name_no','quantity_of',]

class Inventoryfilter(django_filters.FilterSet):
	item_name = django_filters.CharFilter(lookup_expr='icontains')
	ser_prod_no = django_filters.CharFilter(lookup_expr='icontains')

	class Meta:
		model = Inventory
		fields = ['item_name','ser_prod_no','category_inf','lab_name_no',]