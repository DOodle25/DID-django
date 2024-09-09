from django.db import models

class Scheme(models.Model):
    schemename = models.CharField(max_length=255)
    ministry = models.CharField(max_length=255)
    desc = models.TextField()
    place = models.CharField(max_length=255)
    moneygranted = models.DecimalField(max_digits=15, decimal_places=2)
    moneyspent = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.CharField(max_length=50)
    progress = models.FloatField()
    leadperson = models.CharField(max_length=255)
    lasteditedby = models.CharField(max_length=255)
    timeOfschemeAdded = models.TimeField()
    date = models.DateField()
    srno = models.AutoField(primary_key=True)

    def __str__(self):
        return self.schemename
