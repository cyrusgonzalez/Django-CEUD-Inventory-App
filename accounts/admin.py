from django.contrib import admin
from django import forms
from .models import CustomUser
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.conf import settings


class AddUserForm(forms.ModelForm):
	"""
	New User Form. Requires password confirmation.
	"""
	password1 = forms.CharField(
		label='Password', widget=forms.PasswordInput
	)
	password2 = forms.CharField(
		label='Confirm password', widget=forms.PasswordInput
	)

	class Meta:
		model = CustomUser
		fields = ('username','email','first_name','last_name','regcode',)

	def clean_password2(self):
		# Check that the two password entries match
		password1 = self.cleaned_data.get("password1")
		password2 = self.cleaned_data.get("password2")
		if password1 and password2 and password1 != password2:
			raise forms.ValidationError("Passwords do not match")
		return password2

	def save(self, commit=True):
		# Save the provided password in hashed format
		user = super().save(commit=False)
		user.set_password(self.cleaned_data["password1"])
		if commit:
			user.save()
		return user


class UpdateUserForm(forms.ModelForm):
	"""
	Update User Form. Doesn't allow changing password in the Admin.
	"""
	password = ReadOnlyPasswordHashField()

	class Meta:
		model = CustomUser
		fields = (
			'username','email','password','first_name','regcode',
			'last_name','is_active','is_staff','is_supervisor'
		)

	def clean_password(self):
# Password can't be changed in the admin
		return self.initial["password"]


class UserAdmin(BaseUserAdmin):
	form = UpdateUserForm
	add_form = AddUserForm

	list_display = ('username','email','first_name','last_name','regcode','is_staff', 'is_superuser','is_supervisor')
	list_filter = ('is_staff', 'is_superuser', 'is_supervisor')
	fieldsets = (
		(None, {'fields': ('username','email','password')}),
		('Personal info', {'fields': ('first_name','last_name')}),
		('Permissions', {'fields': ('is_active','is_staff','is_superuser','is_supervisor')}),
	)
	add_fieldsets = (
		(
			None,
			{
				'classes': ('wide',),
				'fields': (
					'username','email','first_name',
					'last_name','password1','password2'
				)
			}
		),
	)
	search_fields = ('username', 'first_name', 'last_name')
	ordering = ('username', 'first_name', 'last_name')
	filter_horizontal = ()


admin.site.register(CustomUser, UserAdmin)