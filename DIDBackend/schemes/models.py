from django.conf import settings
from django.db import models

class SchemeData(models.Model):
    schemename = models.CharField(max_length=255)
    ministry = models.CharField(max_length=255)
    desc = models.TextField()
    place = models.CharField(max_length=255)
    moneygranted = models.DecimalField(max_digits=12, decimal_places=2)
    moneyspent = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=100)
    progress = models.FloatField()
    leadperson = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='lead_person_schemes')
    lasteditedby = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='last_edited_schemes', on_delete=models.CASCADE)
    timeOfschemeAdded = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    srno = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if self.moneygranted > 0:
            self.progress = (self.moneyspent / self.moneygranted) * 100
        super().save(*args, **kwargs)
