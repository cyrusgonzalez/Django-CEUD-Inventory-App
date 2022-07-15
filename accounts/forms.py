from django import forms
from .models import CustomUser
from django.conf import settings
from django.contrib.auth.forms import UserCreationForm

class Userform(UserCreationForm):

	class Meta:
		model = CustomUser
		fields = ['username','first_name','last_name','email','regcode',]

	def save_admin(self, commit=True):
		user = super().save(commit=False)
		user.is_supervisor = True
		if commit:
			user.save()
		return user

class Loginform(forms.Form):
	username = forms.CharField(widget=forms.TextInput(
		attrs={'class': 'form-control','type':'text','name': 'username'}), 
		label='Username')
	password = forms.CharField(widget=forms.PasswordInput(
		attrs={'class':'form-control','type':'password', 'name': 'password'}),
		label='Password')

	class Meta:
		fields = ['username','password',]