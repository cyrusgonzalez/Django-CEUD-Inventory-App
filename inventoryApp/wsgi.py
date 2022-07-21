"""
WSGI config for inventoryApp project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os
import dotenv

from django.core.wsgi import get_wsgi_application

dotenv.load_dotenv(
	os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
)

os.environ.setdefault(
	'DJANGO_SETTINGS_MODULE',
	'inventoryApp.settings.production'
)

if os.getenv('DJANGO_SETTINGS_MODULE'):
	os.environ['DJANGO_SETTINGS_MODULE'] = os.getenv('DJANGO_SETTINGS_MODULE')

application = get_wsgi_application()
