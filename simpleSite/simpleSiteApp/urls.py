from . import views
from django.urls import path

urlpatterns = [
    path('getTeaInfo/<str:tea>', views.getTeaInfo, name="teaInfo"),
    path('getTeas', views.getTeasAvaliable, name="teas"),

]