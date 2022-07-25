<<<<<<< HEAD
from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

CSRF_TRUSTED_ORIGINS = [
	'https://labs-inventory.engr.colostate.edu'
]

ALLOWED_HOSTS = [
	'labs-inventory.engr.colostate.edu',
	'https://labs-inventory.engr.colostate.edu',
	'129.82.23.238'
]

DATABASES = {
#	'default': {
#	 	'ENGINE': 'django.db.backends.sqlite3',
#	 	'NAME': 'db.sqlite3',
#	}
	'default': {
		'ENGINE': 'django.db.backends.mysql',
		'NAME': 'items',
		'USER': os.getenv('SQL_USER'),
		'PASSWORD': os.getenv('SQL_PASS'),
		'HOST': '127.0.0.1',
		'PORT': '3306',
		'OPTIONS': {
			'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
		}
	}
}

SECURE_SSL_REDIRECT = False

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True
=======
from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

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
>>>>>>> 19ec17120eac86205878ba80d262c2dd6388da91
