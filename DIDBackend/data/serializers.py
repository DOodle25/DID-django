from rest_framework import serializers
from .models import CityData

class CityDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityData
        fields = '__all__'
