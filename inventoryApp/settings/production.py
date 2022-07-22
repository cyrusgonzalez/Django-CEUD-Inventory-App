from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = False

CSRF_TRUSTED_ORIGINS = [
	'https://labs-inventory.engr.colostate.edu'
]

ALLOWED_HOSTS = [
	'labs-inventory.engr.colostate.edu',
	'https://labs-inventory.engr.colostate.edu'
]

DATABASES = {
	# 'default': {
	# 	'ENGINE': 'django.db.backends.sqlite3',
	# 	'NAME': 'db.sqlite3',
	# }
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'NAME': os.getenv('SQL_NAME'),
		'USER': os.getenv('SQL_USER'),
		'PASSWORD': os.getenv('SQL_PASS'),
		'HOST': '127.0.0.1',
		'PORT': '3306',
	}
}

SECURE_SSL_REDIRECT = False

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True
