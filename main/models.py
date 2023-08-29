from __future__ import unicode_literals
from django.db.models.functions import Upper
from django.db import models

# Create your models here.

class Inventory(models.Model):
	item_name = models.CharField(max_length=50, default='')
	ser_prod_no = models.CharField(max_length = 32)
	descript_inf = models.CharField(max_length = 200)
	category_inf = models.CharField(max_length = 200)
	lab_name_no = models.CharField(max_length = 200)
	quantity_of = models.PositiveIntegerField(default = 0)
	#threshold_val = models.PositiveIntegerField(default = 0, blank = True)

	def __str__(self):
		return self.item_name

	class Meta:
		ordering = [Upper('item_name')]