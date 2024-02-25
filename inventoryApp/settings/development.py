from .base import *
from decouple import config

#SECRET_KEY = config('SECRET_KEY')
SECRET_KEY = "1!@c$pdgpgmpjnpmn_8ik)2)9a$9ac*8%8$%@zryv$ahc%sr-d"

DEBUG = True

DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.sqlite3',
		'NAME': 'db.sqlite3',
	}
}