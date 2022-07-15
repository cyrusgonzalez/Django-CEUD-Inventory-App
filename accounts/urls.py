from django.urls import path
from . import views

app_name= 'accounts'
urlpatterns = [
	path("login/", views.loginuser, name="loginuser"),
    path("register/", views.register, name="register"),
    path('logout/', views.logoutuser, name='logoutuser'),
    path("users/", views.users, name='users'),
]