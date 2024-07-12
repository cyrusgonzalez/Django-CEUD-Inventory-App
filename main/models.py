from django.db import models
from django.db.models.functions import Upper

class Lab(models.Model):
    lab_id = models.AutoField(db_column='LabID', primary_key=True)
    name = models.CharField(db_column='LabName', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'Lab'

class Category(models.Model):
    category_id = models.AutoField(db_column='CategoryID', primary_key=True)
    name = models.CharField(db_column='CategoryName', max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'Category'

class Item(models.Model):
    item_id = models.AutoField(db_column='ItemID', primary_key=True)
    name = models.CharField(db_column='ItemName', max_length=255)
    serial_no = models.CharField(db_column='SerialNo', max_length=255, blank=True, null=True)
    description = models.TextField(db_column='Description', blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'Item'

class Inventory(models.Model):
    record_id = models.AutoField(db_column='RecordID', primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='ItemID')
    lab = models.ForeignKey(Lab, on_delete=models.CASCADE, db_column='LabID')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='CategoryID')
    quantity = models.PositiveIntegerField(db_column='Quantity')
    threshold_low = models.PositiveIntegerField(db_column='Threshold_low', blank=True, null=True)
    threshold_high = models.PositiveIntegerField(db_column='Threshold_high', blank=True, null=True)

    def __str__(self):
        return f"{self.item.name} in {self.lab.name}"

    class Meta:
        ordering = [Upper('item__name')]
        managed = False
        db_table = 'Inventory'
