from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes, api_view
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .forms import Userform, Loginform
from .models import CustomUser

# Create your views here.
@api_view(['GET'])
def index(request):
	return render(request, 'index.html')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logoutuser(request):
	logout(request)
	return redirect(reverse('index'))

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = JSONParser().parse(request)
    form = Userform(data)
    if form.is_valid():
        user = form.save()
        return Response({'message': 'Registration successful'}, status=200)
    else:
        return Response({'errors': form.errors}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def loginuser(request):
    data = JSONParser().parse(request)
    username = data.get('username')
    password = data.get('password')
    form = Loginform(data)
    if form.is_valid():
        user = authenticate(request, username=username, password=password)
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=200)
    else:
        return Response({'error': 'Invalid Credentials'}, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def users(request):
	showusers = CustomUser.objects.all
	return render(request, 'users.html',{'allusers':showusers})