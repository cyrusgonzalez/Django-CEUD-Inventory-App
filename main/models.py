from __future__ import unicode_literals
from django.db import models

from django.db.models.functions import Upper

# Create your models here.

class Lab(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name
	
	class Meta:
		managed = False
		db_table = 'Lab'

class Category(models.Model):
	name = models.CharField(max_length=200)

	def __str__(self):
		return self.name
	
	class Meta:
		managed = False
		db_table = 'Category'

class Item(models.Model):
	name = models.CharField(max_length=50)
	serial_no = models.CharField(max_length=32, blank=True, null=True)
	description = models.TextField(blank=True, null=True)

	def __str__(self):
		return self.name
	
	class Meta:
		managed = False
		db_table = 'Item'

class Inventory(models.Model):
	item = models.ForeignKey(Item, on_delete=models.CASCADE, default=1)
	lab = models.ForeignKey(Lab, on_delete=models.CASCADE, default=1)
	category = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
	quantity = models.PositiveIntegerField(default=0)
	threshold_low = models.PositiveIntegerField(default=0)
	threshold_high = models.PositiveIntegerField(default=0)

	def __str__(self):
		return f"{self.item.name} in {self.lab.name}"

	class Meta:
		ordering = [Upper('item__name')]
		managed = False
		db_table = 'Inventory'
