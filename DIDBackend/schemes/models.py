from django.db import models

class Scheme(models.Model):
    name = models.CharField(max_length=255)
    details = models.TextField()
