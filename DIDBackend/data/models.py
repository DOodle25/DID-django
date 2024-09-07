from django.db import models

class CityData(models.Model):
    name = models.CharField(max_length=255)
    population = models.IntegerField()
