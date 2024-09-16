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
        new_password = user_info.get('new_password', None)
        re_newpassword = user_info.get('re_newpassword', None)
        print(email , password)
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
                    print(email, password)
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
                if new_password and new_password == re_newpassword:
                    user.set_password(new_password)
                    user.save()
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

# class RegisterUserView(views.APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
import random
from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, views
from rest_framework.response import Response
from .models import User, OtpVerification
from .serializers import UserSerializer
from django.utils import timezone


class RegisterUserView(views.APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Generate OTP
            otp_code = random.randint(100000, 999999)
            OtpVerification.objects.create(user=user, otp=otp_code)

            # Send OTP via email
            send_mail(
                'Your OTP Code',
                f'Your OTP is {otp_code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response({'message': 'OTP sent to your email'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOtpView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        try:
            user = User.objects.get(email=email)
            otp_verification = OtpVerification.objects.get(user=user, otp=otp)

            if otp_verification and otp_verification.is_valid():
                otp_verification.verified = True
                otp_verification.save()
                return Response({'message': 'OTP verified, registration complete'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except (User.DoesNotExist, OtpVerification.DoesNotExist):
            return Response({'message': 'Invalid email or OTP'}, status=status.HTTP_400_BAD_REQUEST)

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

class LogoutUserView(views.APIView):

    def post(self, request):
        auth_header = get_authorization_header(request).split()
        print(f'Auth Header: {auth_header}')
        if auth_header and len(auth_header) == 2:
            token = auth_header[1].decode('utf-8')
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
                user_id = payload['id']

                # Remove the session
                ActiveSession.objects.filter(user_id=user_id, token=token).delete()

                return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
            except jwt.ExpiredSignatureError:
                return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"error": "Authorization header missing or malformed"}, status=status.HTTP_401_UNAUTHORIZED)




from django.core.mail import send_mail
from django.conf import settings
from rest_framework import status, views
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from .models import User, OtpVerification
from .serializers import UserSerializer
import random

class SendOtpView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            otp_code = random.randint(100000, 999999)
            OtpVerification.objects.create(user=user, otp=otp_code)

            send_mail(
                'Your OTP Code',
                f'Your OTP is {otp_code}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
            return Response({'message': 'OTP sent to your email'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'message': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)

class ResetPasswordView(views.APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        new_password = request.data.get('newPassword')

        try:
            user = User.objects.get(email=email)
            otp_verification = OtpVerification.objects.get(user=user, otp=otp)

            if otp_verification and otp_verification.is_valid():
                otp_verification.verified = True
                otp_verification.save()
                user.set_password(new_password)
                user.save()
                return Response({'message': 'Password successfully reset'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid or expired OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({'message': 'Email not found'}, status=status.HTTP_404_NOT_FOUND)
        except OtpVerification.DoesNotExist:
            return Response({'message': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
