from .models import CitiesData, TalukaPopulation
from rest_framework import serializers

class TalukaPopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TalukaPopulation
        fields = ['taluka_name', 'total_population']

class CityDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitiesData
        fields = '__all__'
