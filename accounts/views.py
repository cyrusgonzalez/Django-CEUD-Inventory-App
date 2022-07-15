from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render, redirect
from django.urls import reverse
from .forms import Userform, Loginform
from .models import CustomUser

# Create your views here.
def index(request):
	return render(request, 'index.html')

@login_required
def logoutuser(request):
	logout(request)
	return redirect(reverse('index'))

def register(request):
	if request.method == "POST":
		form = Userform(request.POST)
		regcode = request.POST.get("regcode")
		if form.is_valid():
			if regcode == settings.USER_BASIC_REG:
				user = form.save()
				messages.error(request, 'Registration Successful!\nUser Created')
				return redirect(reverse('accounts:register'))
			elif regcode == settings.USER_ADMIN_REG:
				user = form.save_admin()
				messages.error(request, 'Registration Successful!\nAdmin Created')
				return redirect(reverse('accounts:register'))
			else:
				messages.error(request, "Failed Registration:\nRegistrastion code is invalid")
		else:
			messages.error(request, 'Failed Registration:\nPassword does not meet expectations')
			return render(request, 'registerpage.html', {})
	else:
		form = Userform()
	return render(request, 'registerpage.html', 
		{'form':form})

def loginuser(request):
	if request.method == 'POST':
		form = Loginform(request.POST)
		if form.is_valid():
			username = form.cleaned_data["username"]
			password = form.cleaned_data["password"]
			user = authenticate(username=username, password=password)
			if user:
				login(request, user)
				return redirect(reverse('main:inventorypage'))
			else:
				messages.error(request, 'Failed Login:\nInvalid Credientials')
				return render(request, 'loginpage.html',{'form':form,})
	else:
		form = Loginform()
	return render(request, 'loginpage.html',{'form':form,})

def users(request):
	showusers = CustomUser.objects.all
	return render(request, 'users.html',{'allusers':showusers})