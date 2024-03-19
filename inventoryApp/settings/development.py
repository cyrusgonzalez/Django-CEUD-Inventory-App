from .base import *
from decouple import config
import os
import dotenv

# dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '/../../.env'))

SECRET_KEY = "1!@c$pdgpgmpjnpmn_8ik)2)9a$9ac*8%8$%@zryv$ahc%sr-d"

# print("Database Host:", os.getenv('DB_HOST'))

DEBUG = True

DATABASES = {
	# 'default': {
	# 	'ENGINE': 'django.db.backends.sqlite3',
	# 	'NAME': 'db.sqlite3',
	# },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
		'NAME': "labs_inv",
        'USER': "root",
        'PASSWORD': "labs-inventory-ets-mariadb",
        'HOST': "labs-mariadb.engr.colostate.edu",
        'PORT': 3306,
	}
}