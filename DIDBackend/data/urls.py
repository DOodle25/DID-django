from django.urls import path
from .views import get_cities_data, add_cities_data, get_age_population

urlpatterns = [
    path('getcitiesdata/', get_cities_data, name='get_cities_data'),
    path('cities/add/', add_cities_data, name='add_cities_data'),
    path('agepops/', get_age_population, name='get-age-population'),
]
