from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = False

CSRF_TRUSTED_ORIGINS = [
	os.getenv('ORIGINNAMES')
]

ALLOWED_HOSTS = os.getenv('SERVERNAMES').split()

DATABASES = {
	'default': {
	 	'ENGINE': 'django.db.backends.sqlite3',
	 	'NAME': 'db.sqlite3',
	}
#	'default': {
#		'ENGINE': 'django.db.backends.mysql',
#		'NAME': 'items',
#		'USER': os.getenv('SQL_USER'),
#		'PASSWORD': os.getenv('SQL_PASS'),
#		'HOST': '127.0.0.1',
#		'PORT': '3306',
#		'OPTIONS': {
#			'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
#		}
#	}
}

SECURE_SSL_REDIRECT = False

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True
