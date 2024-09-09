from django.http import JsonResponse
from .models import CitiesData
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TalukaPopulation, CityDataSerializer

@api_view(['GET'])
def get_taluka_population(request):
    try:
        populations = TalukaPopulation.objects.all().values('taluka_name', 'total_population')
        return JsonResponse(list(populations), safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def get_cities_data(request):    
    try:
        cities_data = CitiesData.objects.all()        
        serializer = CityDataSerializer(cities_data, many=True)        
        return Response({
            "success": True,
            "data": serializer.data,
            "message": "Cities data retrieved successfully"
        }, status=status.HTTP_200_OK)
    except Exception as error:
        return Response({
            "success": False,
            "message": "Internal Server Error"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_cities_data(request):
    try:
        cities_data = CitiesData.objects.all()
        srno = cities_data.count() + 1
        request.data['srno'] = srno
        serializer = CitiesDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "data": serializer.data,
                "message": "Cities data added successfully"
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as error:
        return Response({
            "success": False,
            "message": "Internal Server Error"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)