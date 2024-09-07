from rest_framework import serializers
from .models import Scheme

class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = '__all__'
