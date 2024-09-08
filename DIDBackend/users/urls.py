from django.urls import path
from .views import RegisterUserView, LoginUserView, UserProfileView, UserProfileUpdateView
urlpatterns = [
    path('register', RegisterUserView.as_view(), name='register'),
    path('login', LoginUserView.as_view(), name='login'),
    path('profile', UserProfileView.as_view(), name='profile'),  # Add this line for profile
    path('profile/update', UserProfileUpdateView.as_view(), name='profile-update'),  # New route for updating profile
]
