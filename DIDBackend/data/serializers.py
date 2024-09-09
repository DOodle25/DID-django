from rest_framework import serializers
from .models import CitiesData
from .models import TalukaPopulation

class TalukaPopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TalukaPopulation
        fields = ['taluka_name', 'total_population']


class CityDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitiesData
        fields = '__all__'
