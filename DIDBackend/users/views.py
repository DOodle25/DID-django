from rest_framework import status, views
from rest_framework.response import Response
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer
from users.models import ActiveSession
from django.core.exceptions import ObjectDoesNotExist
import jwt
from datetime import datetime, timedelta
from django.conf import settings

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from django.http import JsonResponse


from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth import get_user_model

# User = get_user_model()


class UserProfileUpdateView(views.APIView):

    def patch(self, request):
        # Extract token from headers
        auth_header = request.data
        # Access headers
        headers = auth_header.get('headers', {})
        authorization_header = headers.get('Authorization', None)
        user_info = headers.get('user', {})

        # Extract user details
        username = user_info.get('username', None)
        email = user_info.get('email', None)
        password = user_info.get('password', None)
        role = user_info.get('role', None)
        first_name = user_info.get('first_name', None)
        last_name = user_info.get('last_name', None)

        # Print extracted data
        print(f'Authorization Header: {authorization_header}')
        print(f'Username: {username}')
        print(f'Email: {email}')
        print(f'Password: {password}')
        print(f'Role: {role}')
        print(f'First Name: {first_name}')
        print(f'Last Name: {last_name}')
        
        # Extract token
        if auth_header:
            token = authorization_header.split(' ')[1]  # Authorization: Bearer <token>
            print(f'Token: {token}')
        
            try:
                # Assuming password is in the request data                
                user = authenticate(email=email, password=password)
                if not user:
                    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                print(f'Authenticated User: {user}')
                
                # Update user profile fields one by one
                if first_name:
                    user.first_name = first_name
                    print(f"Updating first name to: {first_name}")
                    user.save()

                if last_name:
                    user.last_name = last_name
                    print(f"Updating last name to: {last_name}")
                    user.save()

                # Respond with updated user data
                serializer = UserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)

            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
                return Response({'message': 'Invalid or expired token'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({'message': 'Authorization header missing'}, status=status.HTTP_401_UNAUTHORIZED)

class UserProfileView(views.APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication to access this view

    def get(self, request):
        # Extract the token from the authorization header
        auth_header = get_authorization_header(request).split()
        if auth_header and len(auth_header) == 2:
            token = auth_header[1].decode('utf-8')

            try:
                # Decode the token to extract the user's ID
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = payload['id']

                # Fetch the user from the database
                user = User.objects.get(id=user_id)
                serializer = UserSerializer(user)

                # Return the user's profile data
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
            # token = user.generate_auth_token()
            # response = {
            #     # 'token': token,
            #     'username': user.username,
            #     'email': user.email,
            #     'role': user.role,
            #     'first_name': user.first_name,
            #     'last_name': user.last_name,
            # }
            # return Response(response, status=status.HTTP_200_OK)
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

        return Response({
            "success": True,
            "token": session.token,
            "user": {"_id": user.pk, "username": user.username, "email": user.email, "role": user.role, "first_name": user.first_name, "last_name": user.last_name},
        })


