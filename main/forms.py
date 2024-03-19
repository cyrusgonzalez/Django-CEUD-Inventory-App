from django import forms
from .models import Inventory, Lab, Category, Item
import django_filters

class Inventoryform(forms.ModelForm):

	class Meta:
		model = Inventory
		fields = ['item','lab','category','quantity','threshold_low','threshold_high']
		widgets = {
			'item': forms.Select(attrs={'class': 'form-control'}),
			'lab': forms.Select(attrs={'class': 'form-control'}),
			'category': forms.Select(attrs={'class': 'form-control'}),
			'quantity': forms.NumberInput(attrs={'class': 'form-control'}),
			'threshold_low': forms.NumberInput(attrs={'class': 'form-control'}),
			'threshold_high': forms.NumberInput(attrs={'class': 'form-control'}),
		}

class Inventoryfilter(django_filters.FilterSet):
	item = django_filters.CharFilter(lookup_expr='icontains')
	lab = django_filters.CharFilter(lookup_expr='icontains')
	category = django_filters.CharFilter(lookup_expr='icontains')

	class Meta:
		model = Inventory
		fields = ['item','lab','category']