from .base import *
from decouple import config
import os

SECRET_KEY = os.getenv('SECRET_DEV_KEY')

# print("Database Host:", os.getenv('DB_HOST'))
# print("Database Name:", os.getenv('DB_NAME'))
# print("Database User:", os.getenv('DB_USER'))
# print("Database Password:", os.getenv('DB_PASS'))
# print("Database Port:", os.getenv('DB_PORT'))

DEBUG = True

DATABASES = {
	# 'default': {
	# 	'ENGINE': 'django.db.backends.sqlite3',
	# 	'NAME': 'db.sqlite3',
	# },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
		'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASS'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT'),
	}
}