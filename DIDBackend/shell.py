from django.contrib.auth.models import User

user = User.objects.get(username='admin')
user.set_password('new_password')
user.save()
exit()
