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
        exempt_routes = ['/login', '/register', '/profile/update']
        # skip admin routes
        if request.path.startswith('/admin/') or request.path in exempt_routes:
            return self.get_response(request)
        token = request.headers.get('Authorization')
        if not token:
            return JsonResponse({'error': 'Authorization header is missing'}, status=401)
        try:
            token = token.split()[1]
        except IndexError:
            return JsonResponse({'error': 'Invalid token format'}, status=401)
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('id')
            try:
                user = User.objects.get(id=user_id)
                request.user = user
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        response = self.get_response(request)
        return response
