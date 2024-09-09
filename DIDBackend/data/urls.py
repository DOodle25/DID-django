from django.urls import path
from .views import get_cities_data, add_cities_data, get_taluka_population

urlpatterns = [
    path('agepops/', get_taluka_population, name='get_taluka_population'),
    path('cities/add/', add_cities_data, name='add_cities_data'),
    path('getcitiesdata/', get_cities_data, name='get_cities_data'),
]
