from __future__ import unicode_literals
from django.contrib import messages
from django.shortcuts import render, redirect
from django.urls import reverse
from django.shortcuts import render

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import CustomUser
from accounts.decorators import admin_required
from .forms import Inventoryform, Inventoryfilter
from .models import Inventory, Lab, Category, Item
from .serializers import InventorySerializer, LabSerializer, CategorySerializer, ItemSerializer


# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def inventorypage(request):
    inventories = Inventory.objects.all()
    serializer = InventorySerializer(inventories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addinventory(request):
	serializer = InventorySerializer(data=request.data)
	if serializer.is_valid():
		serializer.save()
		return Response(serializer.data, status=status.HTTP_201_CREATED)
	return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def additem(request):
    serializer = InventorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edititem(request, item_id):
    try:
        item = Inventory.objects.get(pk=item_id)
    except Inventory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = InventorySerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteitem(request, item_id):
    try:
        item = Inventory.objects.get(pk=item_id)
    except Inventory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def addcategory(request):
	categories = Category.objects.all()
	serializer = CategorySerializer(categories, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deletecategory(request, item_id):
	item = Category.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changecategory'))
	return render(request, "deletecategory.html", {'item':item})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def addlab(request):
	labs = Lab.objects.all()
	serializer = LabSerializer(labs, many=True)
	return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def deletelab(request, item_id):
	item = Lab.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changelab'))
	return render(request, "deletelab.html", {'item':item})

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
def deleteuser(request, item_id):
	item = CustomUser.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changeuser'))
	return render(request, "deleteuser.html", {'item':item})