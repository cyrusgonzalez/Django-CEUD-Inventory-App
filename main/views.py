from __future__ import unicode_literals
from django.contrib import messages
from django.contrib.auth.decorators import login_required
# from django.core.paginator import Paginator
# from django.db.models.functions import Upper
from django.shortcuts import render, redirect
from django.urls import reverse
from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from accounts.models import CustomUser
from accounts.decorators import admin_required

from .forms import Inventoryform, Inventoryfilter
from .models import Inventory

# Create your views here.

@api_view(['GET'])

def home(request):
	return Response({'message': 'Hello, world!'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inventorypage(request):
	f = Inventoryfilter(request.GET, queryset=Inventory.objects.all())
	return Response({'inventory': f})

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def additem(request):
	if(request.method == 'POST'):
		item_name = request.POST['item_name']
		ser_prod_no = request.POST['ser_prod_no']
		descript_inf = request.POST['descript_inf']
		category_inf = request.POST['category_inf']
		lab_name_no = request.POST['lab_name_no']
		quantity_of = request.POST['quantity_of']
		#threshold_val = request.POST['threshold_val']
		form = Inventoryform(request.POST)
		if form.is_valid():
			if Inventory.objects.filter(item_name = item_name, lab_name_no = lab_name_no).exists():
				messages.error(request, "Error: This item already exist")
			else:
				item = Inventory(item_name = item_name, ser_prod_no = ser_prod_no, 
					descript_inf = descript_inf, category_inf = category_inf,
					lab_name_no = lab_name_no, quantity_of = quantity_of, 
					)#threshold_val = threshold_val
				item.save()
			return redirect(reverse('main:inventorypage'))
	else:
		return render(request, 'additem.html')

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edititem(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item_name = request.POST['item_name']
		ser_prod_no = request.POST['ser_prod_no']
		descript_inf = request.POST['descript_inf']
		quantity_of = request.POST['quantity_of']
		lab_name_no = request.POST['lab_name_no']
		category_inf = request.POST['category_inf']
		#threshold_val = request.POST['threshold_val']
		form = Inventoryform(request.POST)
		if form.is_valid():
			Inventory.objects.filter(pk=item_id).update(item_name=item_name)
			Inventory.objects.filter(pk=item_id).update(ser_prod_no=ser_prod_no)
			Inventory.objects.filter(pk=item_id).update(descript_inf=descript_inf)
			Inventory.objects.filter(pk=item_id).update(quantity_of=quantity_of)
			Inventory.objects.filter(pk=item_id).update(lab_name_no=lab_name_no)
			Inventory.objects.filter(pk=item_id).update(category_inf=category_inf)
			#Inventory.objects.filter(pk=item_id).update(threshold_val=threshold_val)
		return redirect(reverse('main:changeitem'))
	context = {'item':item}
	return render(request, 'edititem.html', context)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	item.quantity_of += 1
	item.save()
	return redirect(reverse('main:inventorypage'))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment10(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	item.quantity_of += 10
	item.save()
	return redirect(reverse('main:inventorypage'))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrement(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	if 0 <= (item.quantity_of - 1):
		item.quantity_of -= 1
		item.save()
		return redirect(reverse('main:inventorypage'))
	messages.error(request, "Cannot go lower than 0, delete item in 'Edit/Delete Items' tab")
	return redirect(reverse('main:inventorypage'))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decrement10(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	if 0 <= (item.quantity_of - 10):
		item.quantity_of -= 10
		item.save()
		return redirect(reverse('main:inventorypage'))
	messages.error(request, "Cannot go lower than 0, delete item in 'Edit/Delete Items' tab")
	return redirect(reverse('main:inventorypage'))

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changeitem(request):
	showItem = Inventory.objects.all
	return render(request, 'changeitem.html', {'allitems':showItem})

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteitem(request, item_id):
	item = Inventory.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changeitem'))
	return render(request, "deleteitem.html", {'item':item})

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def changeuser(request):
	showItem = CustomUser.objects.all
	return render(request, 'changeuser.html', {'allusers':showItem})

@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteuser(request, item_id):
	item = CustomUser.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changeuser'))
	return render(request, "deleteuser.html", {'item':item})