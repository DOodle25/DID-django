from django.urls import path
from .views import CityDataView

urlpatterns = [
    path('cities/', CityDataView.as_view(), name='city_data'),
]
