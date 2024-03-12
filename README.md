# Django-CEUD-Inventory-App
A base system for the Engineering Technology Services at Colorado State University, up to date on all fixes with the abscense of SQL connections given the right to command all of the connections on one's own server.

Requires:
    -Using Python 3.9.7 or better
    -Django Framework v4.0.5 or better
    -MySql/MariaDB and/or SqLite3 (if not using default internal db.sqlite3)

Before Hand:
1. Locate the directory in which you forked or pulled the code into ("T:\\his\is\your\projectfolder")
2. Run 'python manage.py migrate --default'
3. Followed it with 'python manage.py makemigrations'
4. After this is done, you should have your Default db.sqlite3 database configured
5. Configured for Production at the moment so to run the debug on the server, navigate to inventoryApp/settings/production.py and set DEBUG=True in the page itself
    -Alternatively you can also go to the ***

For the environment variables, the following will have to be declared for testing on your own fork.
If committing, Please make sure to create a new branch and follow it, as master will not allow commits/merge.

    -DJANGO_SETTINGS_MODULE="inventoryApp.settings.production"
    -SECRET_KEY="YOUR-django-KEY-here-1234598765"
    -USER_ADMIN_REG="AdminCodeR3g3X"
    -USER_BASIC_REG="StandardR3g3X"
        **NOTE: You do have to create a pair of 7-digit integer keys {verbose_name},
        these are to be for BOTH user registrations (Permissions listed below)
    -SQL_USER="mySqlUser"
    -SQL_PASS="mySqlPasswordH3r3"
    -SERVERNAMES="server.domain.net:#### https://server.domain.net:#### IP4.NUM.BER.000:####"
    -ORIGINNAMES="https://server.domain.net:####"

To App:


***change the ALLOWED HOST values
***include wsgi, base, and manage py changes

1. install Django 5.0.3 at the least or latest verion from Django website with standard installation instructions

2. install python 3.9.7 at the least or latest verion from Python website

3. install libraries:
* django-filter
* python-dotenv
* python-decouple
* python-ldap
* django-auth-ldap

4. initialize tables: 
* python manage.py makemigrations accounts
* python manage.py makemigrations main

5. instantiate new database with all account, inventory, and app schemas: python manage.py migrate

6. Create the superuser (Django Admin): python manage.py createsuperuser
* Fill the entire form, and use default admin regcode: 4242466
