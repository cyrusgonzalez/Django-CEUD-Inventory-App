"""
Base settings for inventoryApp project.

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""

import ldap
import os
import logging

from pathlib import Path
from dotenv import load_dotenv
from django_auth_ldap.config import LDAPSearch, GroupOfNamesType

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Use BASE_DIR to construct the path to the .env file
dotenv_path = BASE_DIR / '.env'

# Load the .env file
load_dotenv(dotenv_path)

# Application definition

INSTALLED_APPS = [
	'django.contrib.admin',
	'django.contrib.auth',
	'django.contrib.contenttypes',
	'django.contrib.sessions',
	'django.contrib.messages',
	'django.contrib.staticfiles',
	'main.apps.MainConfig',
	'accounts.apps.AccountsConfig',
	'django_filters',
	'django_auth_ldap',
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
	'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
	'django.middleware.common.CommonMiddleware',
	'django.middleware.csrf.CsrfViewMiddleware',
	'django.contrib.auth.middleware.AuthenticationMiddleware',
	'django.contrib.messages.middleware.MessageMiddleware',
	'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTHENTICATION_BACKENDS = [
	'django.contrib.auth.backends.ModelBackend',
	'django_auth_ldap.backend.LDAPBackend',
]

ROOT_URLCONF = 'inventoryApp.urls'

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]

CORS_ORIGIN_ALLOW_ALL = True

WSGI_APPLICATION = 'inventoryApp.wsgi.application'

# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
		'OPTIONS':{'min_length':8},
	},
	{
		'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
	},
	{
		'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
	},
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'MST'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_URL = "/accounts/login/"                  
LOGIN_REDIRECT_URL ="/main/inventory/"
LOGOUT_REDIRECT_URL = "/"

USER_ADMIN_REG = os.getenv('USER_ADMIN_REG')
USER_BASIC_REG = os.getenv('USER_BASIC_REG')
# print("User Admin Reg:", USER_ADMIN_REG)
# print("User Basic Reg:", USER_BASIC_REG)

AUTH_USER_MODEL = "accounts.CustomUser"

# LDAP Configuration

# Logging configuration for django_auth_ldap
logger = logging.getLogger('django_auth_ldap')
logger.addHandler(logging.StreamHandler())
logger.setLevel(logging.DEBUG)

AUTH_LDAP_SERVER_URI = os.getenv('LDAP_SERVER_URI')
print("LDAP Server URI:", os.getenv('LDAP_SERVER_URI'))

AUTH_LDAP_BIND_DN = ""
AUTH_LDAP_BIND_PASSWORD = ""
AUTH_LDAP_USER_SEARCH = LDAPSearch(
	os.getenv('LDAP_BASE_DN'),
	ldap.SCOPE_SUBTREE,
	os.getenv('LDAP_FILTER')
)

AUTH_LDAP_GROUP_SEARCH = LDAPSearch(
	os.getenv('LDAP_GROUP_BASE_DN'),
	ldap.SCOPE_SUBTREE,
	os.getenv('LDAP_GROUP_FILTER')
)

AUTH_USER_ATTR_MAP = {
	"first_name": "givenName",
	"last_name": "sn",
	"username": "SamAccountName",
}

AUTH_LDAP_GROUP_TYPE = GroupOfNamesType(name_attr="cn")
