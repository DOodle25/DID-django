import jwt
from django.conf import settings
from django.http import JsonResponse
from users.models import User  # Use your custom User model if applicable

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Skip validation for the login and registration endpoints
        if request.path in ['/login', '/register', 'profile/update']:
            return self.get_response(request)

        # Get the Authorization header
        token = request.headers.get('Authorization')

        if not token:
            return JsonResponse({'error': 'Authorization header is missing'}, status=401)

        # Strip the 'Bearer' prefix if present
        try:
            token = token.split()[1]
        except IndexError:
            return JsonResponse({'error': 'Invalid token format'}, status=401)

        try:
            # Decode the token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = payload.get('id')

            # Check if the user exists
            try:
                user = User.objects.get(id=user_id)
                request.user = user  # Set the user in the request for further use
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'}, status=404)

        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Token has expired'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)

        # Proceed with the request if token is valid
        response = self.get_response(request)
        return response
