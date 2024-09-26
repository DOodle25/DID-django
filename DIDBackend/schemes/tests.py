# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase
# from .models import Scheme, SchemeChangeLog, SchemeTeamMember
# from django.contrib.auth import get_user_model

# class SchemeTests(APITestCase):
#     def setUp(self):
#         User = get_user_model()  
#         self.user = User.objects.create_user(email='testuser@gmail.com',username="testusername" ,password='testpassword')
        
#         self.client.login(email='testuser@gmail.com', password='testpassword')

#         self.scheme_data = {
#             'schemename': 'Test Scheme',
#             'ministry': 'Test Ministry',
#             'desc': 'Test Description',
#             'place': 'Test Place',
#             'moneygranted': 10000.00,
#             'moneyspent': 5000.00,
#             'status': 'Active',
#             'progress': 50.0,
#             'leadperson': 'John Doe',
#             'lasteditedby': 'john@example.com',
#             'timeOfschemeAdded': '12:00:00',
#             'date': '2021-08-01',
#         }
#         self.scheme = Scheme.objects.create(**self.scheme_data)

#     def test_add_scheme(self):
#         response = self.client.post(reverse('add_scheme'), [self.scheme_data], format='json')
        
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Scheme.objects.count(), 1002)

#     def test_get_all_schemes(self):
#         response = self.client.get(reverse('get_all_schemes'))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(len(response.data['schemes']), 1001)

#     def test_get_scheme_by_id(self):
#         response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': self.scheme.srno}))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data['schemes']['schemename'], self.scheme.schemename)

#     def test_update_scheme(self):
#         update_data = {
#             'moneyspent': 7000.00,
#             'lasteditedby': 'john@example.com',
#         }
#         response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.scheme.refresh_from_db()
#         self.assertEqual(self.scheme.moneyspent, 7000.00)

#     def test_delete_scheme(self):
#         response = self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(Scheme.objects.count(), 1000)

#     def test_scheme_change_log(self):
#         self.scheme.lasteditedby = 'john@example.com'
#         self.scheme.save()

#         log_count_before = SchemeChangeLog.objects.count()
#         self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), {'moneyspent': 6000.00, 'lasteditedby': 'john@example.com'}, format='json')

#         self.assertEqual(SchemeChangeLog.objects.count(), log_count_before + 1)

#     def test_team_member_logging(self):
#         self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), {'lasteditedby': 'john@example.com'}, format='json')

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Scheme, SchemeChangeLog
from django.contrib.auth import get_user_model

class SchemeTests(APITestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user(email='testuser@gmail.com', username="testusername", password='testpassword')
        
        self.client.login(email='testuser@gmail.com', password='testpassword')

        self.scheme_data = {
            'schemename': 'Test Scheme',
            'ministry': 'Test Ministry',
            'desc': 'Test Description',
            'place': 'Test Place',
            'moneygranted': 10000.00,
            'moneyspent': 5000.00,
            'status': 'Active',
            'progress': 50.0,
            'leadperson': 'John Doe',
            'lasteditedby': 'john@example.com',
            'timeOfschemeAdded': '12:00:00',
            'date': '2021-08-01',
        }
        self.scheme = Scheme.objects.create(**self.scheme_data)

    def test_add_scheme(self):
        response = self.client.post(reverse('add_scheme'), [self.scheme_data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_schemes(self):
        response = self.client.get(reverse('get_all_schemes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_scheme_by_id(self):
        response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['schemes']['schemename'], self.scheme.schemename)

    def test_update_scheme(self):
        update_data = {
            'moneyspent': 7000.00,
            'lasteditedby': 'john@example.com',
        }
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.scheme.refresh_from_db()
        self.assertEqual(self.scheme.moneyspent, 7000.00)

    def test_delete_scheme(self):
        response = self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_scheme_change_log(self):
        self.scheme.lasteditedby = 'john@example.com'
        self.scheme.save()

        log_count_before = SchemeChangeLog.objects.count()
        self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), {'moneyspent': 6000.00, 'lasteditedby': 'john@example.com'}, format='json')


    def test_team_member_logging(self):
        self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), {'lasteditedby': 'john@example.com'}, format='json')

    def test_add_scheme_with_missing_fields(self):
        data = {
            'schemename': 'Incomplete Scheme',
            'moneygranted': 5000.00,
        }
        response = self.client.post(reverse('add_scheme'), data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_scheme_status_options(self):
        response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': self.scheme.srno}))
        valid_statuses = ['Active', 'Inactive', 'Pending', 'Completed']
        self.assertIn(response.data['schemes']['status'], valid_statuses)

    def test_add_scheme_with_large_moneygranted(self):
        data = self.scheme_data.copy()
        data['moneygranted'] = 1e10  # Large value
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)



    def test_add_scheme_with_valid_date_format(self):
        data = self.scheme_data.copy()
        data['date'] = '2021-12-31'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_valid_date_format(self):
        update_data = {'date': '2021-12-31'}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_invalid_moneygranted(self):
        update_data = {'moneygranted': 'invalid'}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_delete_scheme_with_valid_id(self):
        response = self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_add_scheme_with_minimal_info(self):
        data = {
            'schemename': 'Minimal Scheme',
            'moneygranted': 0.01,
        }
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_scheme_with_zero_moneygranted(self):
        data = self.scheme_data.copy()
        data['moneygranted'] = 0.0
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



    def test_get_scheme_by_id_with_deleted_scheme(self):
        self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
        response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_add_scheme_without_ministry(self):
        data = self.scheme_data.copy()
        data.pop('ministry')
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_scheme_with_non_numeric_moneygranted(self):
        data = self.scheme_data.copy()
        data['moneygranted'] = 'non-numeric'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_scheme_with_special_characters_in_name(self):
        data = self.scheme_data.copy()
        data['schemename'] = '@@@Scheme***'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_special_characters_in_leadperson(self):
        update_data = {'leadperson': '@@@John***'}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_schemes_with_filter(self):
        response = self.client.get(reverse('get_all_schemes') + '?status=Active')
        self.assertEqual(response.status_code, status.HTTP_200_OK)




    def test_update_scheme_with_zero_progress(self):
        update_data = {'progress': 0.0}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_add_scheme_with_existing_last_edited_by(self):
        data = self.scheme_data.copy()
        data['lasteditedby'] = 'john@example.com'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_progress_as_negative_string(self):
        update_data = {'progress': '-100'}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



    def test_add_scheme_with_special_characters_in_ministry(self):
        data = self.scheme_data.copy()
        data['ministry'] = '@@@TestMinistry***'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_scheme_with_special_characters_in_place(self):
        data = self.scheme_data.copy()
        data['place'] = '@@@TestPlace***'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_special_characters_in_moneyspent(self):
        update_data = {'moneyspent': '@@@Invalid***'}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_scheme_with_valid_moneyspent(self):
        update_data = {'moneyspent': 2500.50}
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_get_all_schemes(self):
        response = self.client.get(reverse('get_all_schemes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)



    def test_update_scheme_with_very_long_leadperson(self):
        update_data = {'leadperson': 'A' * 256} 
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_scheme_with_very_long_schemename(self):
        data = self.scheme_data.copy()
        data['schemename'] = 'A' * 256 
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_add_scheme_with_valid_data(self):
        data = self.scheme_data.copy()
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_delete_scheme_with_valid_data(self):
        response = self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_scheme_by_id_with_invalid_id(self):
        response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': 999999}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


    def test_update_scheme_with_valid_date_format(self):
        update_data = {'startdate': '2024-01-01'}  # Valid date
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)



    def test_add_scheme_with_valid_date_format(self):
        data = self.scheme_data.copy()
        data['startdate'] = '2024-01-01'
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    def test_add_scheme_with_empty_dict(self):
        response = self.client.post(reverse('add_scheme'), [{}], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_add_scheme_with_empty_ministry(self):
        data = self.scheme_data.copy()
        data['ministry'] = '' 
        response = self.client.post(reverse('add_scheme'), [data], format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_scheme_without_authorization(self):
        self.client.logout()
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), self.scheme_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_delete_scheme_with_authorization(self):
        response = self.client.delete(reverse('delete_scheme_details', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_all_schemes_with_authorization(self):
        response = self.client.get(reverse('get_all_schemes'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_scheme_by_id_with_authorization(self):
        response = self.client.get(reverse('get_scheme_by_id', kwargs={'id': self.scheme.srno}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_add_scheme_with_authorization(self):
        response = self.client.post(reverse('add_scheme'), [self.scheme_data], format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_scheme_with_authorization(self):
        response = self.client.put(reverse('update_scheme_details', kwargs={'id': self.scheme.srno}), self.scheme_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)