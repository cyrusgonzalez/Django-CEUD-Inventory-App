
from django.db import models
from django.db.models.base import Model
from django.conf import settings
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
	AbstractBaseUser, BaseUserManager, PermissionsMixin
)

class CustomUserManager(BaseUserManager):

	def create_user(
			self, username, email, first_name, last_name, regcode, password=None,
			commit=True):
		"""
		Creates and saves a User with the given credentials.
		"""
		if not username:
			raise ValueError(_('Users must have a username'))
		if not email:
			raise ValueError(_('Users must have an email address'))
		if not first_name:
			raise ValueError(_('Users must have a first name'))
		if not last_name:
			raise ValueError(_('Users must have a last name'))
		if not regcode:
			raise ValueError(_('Users must have a valid regcode'))

		user = self.model(
			username=username,
			email=self.normalize_email(email),
			first_name=first_name,
			last_name=last_name,
			regcode=regcode,
		)

		user.set_password(password)
		if commit:
			user.save()
		return user

	def create_superuser(self, username, email, first_name, last_name, regcode, password):
		"""
		Creates and saves a superuser with the same credentials.
		"""
		user = self.create_user(
			username=username,
			email=email,
			password=password,
			first_name=first_name,
			last_name=last_name,
			commit=False,
			regcode=regcode,
		)

		user.is_staff = True
		user.is_superuser = True
		user.is_supervisor = True
		user.save()
		return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
	username = models.CharField(_('username'), max_length=150, unique=True, null=True)
	email = models.EmailField(_('email'), max_length=255, unique=True, null=True)
	first_name = models.CharField(_('first name'), max_length=30, blank=True)
	last_name = models.CharField(_('last name'), max_length=150, blank=True)
	regcode = models.BigIntegerField(_('regcode'))

	objects = CustomUserManager()

	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = ['email','first_name','last_name', 'regcode']

	is_active = models.BooleanField(_('active'), default=True,)
	is_staff = models.BooleanField(_('staff status'), default=False,)
	is_supervisor = models.BooleanField(_('supervisor'), default=False,)

	def __str__(self):
		return self.first_name + " " + self.last_name + " - Username: " + self.username
