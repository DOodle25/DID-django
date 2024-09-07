# api/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

# Function to generate JWT tokens for the user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# User registration view
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # Save the user if data is valid
        # Return user data with a 201 status code
        return Response({
            'message': 'Registration successful',
            'user': UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)
    # Return validation errors with a 400 status code
    return Response({
        'message': 'Registration failed',
        'errors': serializer.errors,
    }, status=status.HTTP_400_BAD_REQUEST)

# User login view with token generation
@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
        login(request, user)  # Log the user in using Django's built-in login
        tokens = get_tokens_for_user(user)  # Generate JWT tokens for the user
        
        # Return user data and tokens with a 200 status code
        return Response({
            'message': 'Login successful',
            'user': UserSerializer(user).data,
            'tokens': tokens
        }, status=status.HTTP_200_OK)
    
    # Return validation errors with a 400 status code
    return Response({
        'message': 'Login failed',
        'errors': serializer.errors,
    }, status=status.HTTP_400_BAD_REQUEST)

# User logout view
@api_view(['POST'])
def logout_view(request):
    logout(request)  # Log the user out using Django's built-in logout
    # Return a success message with a 200 status code
    return Response({
        'message': 'Logged out successfully'
    }, status=status.HTTP_200_OK)

