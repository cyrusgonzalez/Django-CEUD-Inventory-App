from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = False

CSRF_TRUSTED_ORIGINS = [
	'https://labs-inventory.engr.colostate.edu',
	'https://10.2.224.198:8000'
]

ALLOWED_HOSTS = [
	'labs-inventory.engr.colostate.edu',
	'https://labs-inventory.engr.colostate.edu',
	'10.2.224.198.engr.colostate.edu',
	'https://10.2.224.198:8000'
]

DATABASES = {
	# 'default': {
	# 	'ENGINE': 'django.db.backends.sqlite3',
	# 	'NAME': 'db.sqlite3',
	# }
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'NAME': 'inventoryETSdb',
		'USER': os.getenv('SQL_USER'),
		'PASSWORD': os.getenv('SQL_PASS'),
		'HOST': '127.0.0.1',
		'PORT': '3306',
	}
}

SECURE_SSL_REDIRECT = True

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True
