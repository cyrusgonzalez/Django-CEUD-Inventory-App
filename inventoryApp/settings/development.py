from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': 'db.sqlite3',
	}
}