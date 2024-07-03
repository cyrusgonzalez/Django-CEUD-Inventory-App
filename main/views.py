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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addlab(request):
	lab = LabSerializer(data=request.data)
	if lab.is_valid():
		lab.save()
		return Response(lab.data, status=status.HTTP_201_CREATED)
	return Response(lab.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addcategory(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edititem(request, item_id):
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ItemSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editlab(request, lab_id):
    try:
        lab = Lab.objects.get(pk=lab_id)
    except Lab.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = LabSerializer(lab, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editcategory(request, category_id):
    try:
        category = Category.objects.get(pk=category_id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteitem(request, item_id):
    try:
        item = Item.objects.get(pk=item_id)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletelab(request, lab_id):
    try:
        lab = Lab.objects.get(pk=lab_id)
    except Lab.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    lab.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletecategory(request, category_id):
    try:
        category = Category.objects.get(pk=category_id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
	
@admin_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def deleteuser(request, item_id):
	item = CustomUser.objects.get(pk=item_id)
	if (request.method == 'POST'):
		item.delete()
		return redirect(reverse('main:changeuser'))
	return render(request, "deleteuser.html", {'item':item})@api_view(['POST'])

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

