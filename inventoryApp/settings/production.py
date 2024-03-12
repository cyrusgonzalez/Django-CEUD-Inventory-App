from .base import *

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

CSRF_TRUSTED_ORIGINS = [
	os.getenv('ORIGINNAMES')
]

ALLOWED_HOSTS = os.getenv('SERVERNAMES').split()

DATABASES = {
	'default': {
	 	'ENGINE': 'django.db.backends.sqlite3',
	 	'NAME': 'db.sqlite3',
	}
}

SECURE_SSL_REDIRECT = False

SESSION_COOKIE_SECURE = True

CSRF_COOKIE_SECURE = True

SECURE_BROWSER_XSS_FILTER = True
