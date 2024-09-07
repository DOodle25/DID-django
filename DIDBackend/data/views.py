from rest_framework import status, views
from rest_framework.response import Response
from .models import CityData
from .serializers import CityDataSerializer

class CityDataView(views.APIView):
    def get(self, request):
        city_data = CityData.objects.all()
        serializer = CityDataSerializer(city_data, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CityDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Data added successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
