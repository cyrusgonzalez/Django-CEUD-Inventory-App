from .base import *
from decouple import config

SECRET_KEY = "1!@c$pdgpgmpjnpmn_8ik)2)9a$9ac*8%8$%@zryv$ahc%sr-d"

DEBUG = True

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': 'db.sqlite3',
	},
    'mariadb': {
        'ENGINE': 'django.db.backends.mysql',
		'NAME': 'labs_inv',
        'USER': os.getenv('DB_USER'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': 3306,
        'PASSWORD;': os.getenv('DB_PASS'),
	}
}