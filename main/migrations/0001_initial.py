# Generated by Django 5.0.1 on 2024-01-29 21:48

import django.db.models.functions.text
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Inventory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(default='', max_length=50)),
                ('ser_prod_no', models.CharField(max_length=32)),
                ('descript_inf', models.CharField(max_length=200)),
                ('category_inf', models.CharField(max_length=200)),
                ('lab_name_no', models.CharField(max_length=200)),
                ('quantity_of', models.PositiveIntegerField(default=0)),
            ],
            options={
                'ordering': [django.db.models.functions.text.Upper('item_name')],
            },
        ),
    ]
