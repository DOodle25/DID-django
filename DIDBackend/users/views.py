from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, timedelta
import jwt
from .models import User
from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserSerializer
from users.models import ActiveSession


class UserProfileUpdateView(views.APIView):
    def patch(self, request):
        auth_header = request.data
        headers = auth_header.get('headers', {})
        authorization_header = headers.get('Authorization', None)
        user_info = headers.get('user', {})
        username = user_info.get('username', None)
        email = user_info.get('email', None)
        password = user_info.get('password', None)
        role = user_info.get('role', None)
        first_name = user_info.get('first_name', None)
        last_name = user_info.get('last_name', None)
        # Print extracted data
        # print(f'Authorization Header: {authorization_header}')
        # print(f'Username: {username}')
        # print(f'Email: {email}')
        # print(f'Password: {password}')
        # print(f'Role: {role}')
        # print(f'First Name: {first_name}')
        # print(f'Last Name: {last_name}')
        if auth_header:
            token = authorization_header.split(' ')[1]  # Authorization: Bearer <token>
            print(f'Token: {token}')
            try:
                user = authenticate(email=email, password=password)
                if not user:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                print(f'Authenticated User: {user}')
                if first_name:
                    user.first_name = first_name
                    print(f"Updating first name to: {first_name}")
                    user.save()
                if last_name:
                    user.last_name = last_name
                    print(f"Updating last name to: {last_name}")
                    user.save()
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
                return Response({'message': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(views.APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        auth_header = get_authorization_header(request).split()
        if auth_header and len(auth_header) == 2:
            token = auth_header[1].decode('utf-8')
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = payload['id']
                user = User.objects.get(id=user_id)
                serializer = UserSerializer(user)
                return Response(serializer.data, status=200)
            except jwt.ExpiredSignatureError:
                return JsonResponse({'error': 'Token has expired'}, status=401)
            except jwt.InvalidTokenError:
                return JsonResponse({'error': 'Invalid token'}, status=401)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        return JsonResponse({'error': 'Authorization header missing or malformed'}, status=401)

def _generate_jwt_token(user):
    token = jwt.encode(
        {"id": user.pk, "exp": datetime.utcnow() + timedelta(days=7)},
        settings.SECRET_KEY,
    )
    return token

class RegisterUserView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if not user:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        try:
            session = ActiveSession.objects.get(user=user)
            if not session.token:
                raise ValueError
            jwt.decode(session.token, settings.SECRET_KEY, algorithms=["HS256"])
        except (ObjectDoesNotExist, ValueError, jwt.ExpiredSignatureError):
            session = ActiveSession.objects.create(
                user=user, token=_generate_jwt_token(user)
            )
        # Update the last login time
        user.last_login = timezone.now()
        user.save()
        return Response({
            "success": True,
            "token": session.token,
            "user": {"_id": user.pk, "username": user.username, "email": user.email, "role": user.role, "first_name": user.first_name, "last_name": user.last_name},
        })


