from django.contrib import admin
from .models import TalukaPopulation, CitiesData
from schemes.models import Scheme
from users.models import UserManager, User, ActiveSession

# Providing admin authorities
admin.site.register(TalukaPopulation)
admin.site.register(CitiesData)
admin.site.register(Scheme)
admin.site.register(User)
admin.site.register(ActiveSession)
