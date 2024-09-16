# Middleware to validate JWT tokens for protected routes
from django.conf import settings
from django.http import JsonResponse
import jwt
from users.models import User

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # skip login and register routes
        exempt_routes = ['/login', '/register', '/profile/update', '/verify-otp', '/send-otp', '/reset-password']
        # skip admin routes
        if request.path.startswith('/admin/') or request.path in exempt_routes:
            # print("if1")
            return self.get_response(request)
        token = request.headers.get('Authorization')
        if not token:
            # print("if2")
            return JsonResponse({'error': 'Authorization header is missing'}, status=401)
        try:
            # print("try1")
            token = token.split()[1]
        except IndexError:
            # print("excetption1")
            return JsonResponse({'error': 'Invalid token format'}, status=401)
        try:
            # print("try2")
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('id')
            try:
                # print("try3")
                user = User.objects.get(id=user_id)
                request.user = user
            except User.DoesNotExist:
                # print("excetption2")
                return JsonResponse({'error': 'User not found'}, status=404)
        except jwt.ExpiredSignatureError:
            # print("excetption3")
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            # print("excetption4")
            return JsonResponse({'error': 'Invalid token'}, status=401)
        print("return")
        response = self.get_response(request)
        return response
