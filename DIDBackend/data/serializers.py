from rest_framework import serializers
from .models import CitiesData
from .models import AgePopulation

class AgePopulationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgePopulation
        fields = '__all__'  # Include all fields, or specify which ones to serialize

class CityDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CitiesData
        fields = '__all__'
