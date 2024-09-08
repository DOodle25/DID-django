from rest_framework import status, views
from rest_framework.response import Response
from .models import CitiesData
from .serializers import CityDataSerializer
from rest_framework.decorators import api_view
from .models import AgePopulation
from .serializers import AgePopulationSerializer, CityDataSerializer

@api_view(['GET'])
def get_age_population(request):
    try:
        age_pops = AgePopulation.objects.all()
        serializer = AgePopulationSerializer(age_pops, many=True)
        return Response({
            'agePops': serializer.data,
            'user': request.user.username,  # Adjust based on how you're managing authentication
            'message': "Hello from Django agepop API"
        })
    except Exception as e:
        return Response({'message': str(e)}, status=404)

@api_view(['GET'])
def get_cities_data(request):
    print("Request received for get_cities_data")  # Debug: Start of the view
    
    try:
        print("Querying CitiesData")  # Debug: Before querying the database
        cities_data = CitiesData.objects.all()
        print(f"Number of records retrieved: {cities_data.count()}")  # Debug: Number of records
        
        print("Serializing data")  # Debug: Before serializing
        serializer = CityDataSerializer(cities_data, many=True)
        print(f"Serialized data: {serializer.data}")  # Debug: Serialized data
        
        return Response({
            "success": True,
            "data": serializer.data,
            # "user": request.user,  # Assuming authentication is set up
            "message": "Cities data retrieved successfully"
        }, status=status.HTTP_200_OK)
        
    except Exception as error:
        print(f"Exception occurred: {error}")  # Debug: Print the exception
        return Response({
            "success": False,
            "message": "Internal Server Error"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def add_cities_data(request):
    try:
        cities_data = CitiesData.objects.all()
        srno = cities_data.count() + 1
        request.data['srno'] = srno  # Add serial number to the request data

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