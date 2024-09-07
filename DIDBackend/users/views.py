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