from rest_framework import serializers
from .models import SchemeData

class SchemeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchemeData
        fields = ['id', 'schemename', 'ministry', 'desc', 'place', 'moneygranted', 'moneyspent', 'status', 'progress', 'leadperson', 'lasteditedby', 'timeOfschemeAdded', 'date', 'srno']
