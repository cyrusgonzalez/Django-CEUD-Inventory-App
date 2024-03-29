from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from rest_framework.authtoken.models import Token
from rest_framework.decorators import permission_classes, api_view
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .forms import Userform, Loginform
from .models import CustomUser

# Create your views here.
@api_view(['GET'])
def index(request):
	return render(request, 'index.html')

@login_required
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
        return JsonResponse({'message': 'Registration successful'}, status=200)
    else:
        return JsonResponse({'errors': form.errors}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def loginuser(request):
    data = JSONParser().parse(request)
    username = data.get('username')
    password = data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        # Assuming you're using Django's Token authentication
        token, created = Token.objects.get_or_create(user=user)
        return JsonResponse({'token': token.key}, status=200)
    else:
        return JsonResponse({'error': 'Invalid Credentials'}, status=400)

def users(request):
	showusers = CustomUser.objects.all
	return render(request, 'users.html',{'allusers':showusers})