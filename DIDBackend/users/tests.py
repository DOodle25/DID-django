from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from .models import OtpVerification, ActiveSession
from rest_framework_simplejwt.tokens import AccessToken

User = get_user_model()

class UserTestsTests(APITestCase):
    def setUp(self):
        self.user_data = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "testpassword",
            "role": "user",
            "first_name": "Test",
            "last_name": "User",
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token = AccessToken.for_user(self.user)
        self.url_register = reverse('register')
        self.url_login = reverse('login')
        self.url_verify_otp = reverse('verify_otp')
        self.url_profile = reverse('profile')
        self.url_profile_update = reverse('profile-update')
        self.url_send_otp = reverse('send-otp')

    def test_user_registration_with_otp(self):
        response = self.client.post(self.url_register, self.user_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].subject, 'Your OTP Code')

        otp_verification = OtpVerification.objects.filter(user__email=self.user_data['email']).first()
        self.assertIsNotNone(otp_verification)
        self.assertFalse(otp_verification.verified)

        self.assertEqual(len(otp_verification.otp), 6)

    def test_invalid_registration(self):
        invalid_data = {
            'email': 'invaliduser@example.com'
        }
        response = self.client.post(self.url_register, invalid_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)

    def test_user_login(self):
        response = self.client.post(self.url_login, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)

    def test_verify_otp(self):
        self.client.post(self.url_send_otp, {'email': self.user.email})
        otp_verification = OtpVerification.objects.get(user=self.user)

        response = self.client.post(self.url_verify_otp, {
            'email': self.user.email,
            'otp': otp_verification.otp
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_get_user_profile(self):
        response = self.client.post(self.url_login, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        response = self.client.get(self.url_profile)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], self.user.email)


    def test_update_user_profile(self):
        new_data = {
            'headers': {
                'Authorization': f'Bearer {self.token}',
                'user': {
                    'username': 'testuser',
                    'email': 'testuser@example.com',
                    'password': 'testpassword123',
                    'first_name': 'UpdatedFirst',
                    'last_name': 'UpdatedLast',
                    'new_password': 'newpassword123',
                    're_newpassword': 'newpassword123'
                }
            }
        }

        response = self.client.patch(self.url_profile_update, new_data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()

        self.assertEqual(self.user.first_name, 'UpdatedFirst')
        self.assertEqual(self.user.last_name, 'UpdatedLast')

        self.assertTrue(self.user.check_password('newpassword123'))
    def test_logout_user(self):
        response = self.client.post(self.url_login, {
            'email': self.user_data['email'],
            'password': self.user_data['password']
        })
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

        response = self.client.post(reverse('logout'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_send_otp(self):
        response = self.client.post(self.url_send_otp, {'email': self.user.email})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('message', response.data)

    def test_invalid_login(self):
        response = self.client.post(self.url_login, {
            'email': self.user_data['email'],
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('message', response.data)

    def test_invalid_verify_otp(self):
        response = self.client.post(self.url_verify_otp, {
            'email': self.user.email,
            'otp': 'wrongotp'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)

    def test_unauthorized_profile_access(self):
        response = self.client.get(self.url_profile)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)