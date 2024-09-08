from django.db import models

class AgePopulation(models.Model):
    age_group = models.CharField(max_length=100)  # example field
    population = models.IntegerField()

    def __str__(self):
        return f'{self.age_group}: {self.population}'

# models.py

class CitiesData(models.Model):
    taluka_name = models.CharField(max_length=100, verbose_name="Taluka Name")
    no_of_schools = models.IntegerField(verbose_name="Number of Schools")
    no_of_hospitals = models.IntegerField(verbose_name="Number of Hospitals")
    no_of_colleges = models.IntegerField(verbose_name="Number of Colleges")
    no_of_universities = models.IntegerField(verbose_name="Number of Universities")
    no_of_railway_stations = models.IntegerField(verbose_name="Number of Railway Stations")
    no_of_bus_stations = models.IntegerField(verbose_name="Number of Bus Stations")
    no_of_post_offices = models.IntegerField(verbose_name="Number of Post Offices")
    no_of_police_stations = models.IntegerField(verbose_name="Number of Police Stations")
    no_of_fire_stations = models.IntegerField(verbose_name="Number of Fire Stations")
    date = models.DateField(auto_now_add=True)
    srno = models.IntegerField(unique=True)

    def __str__(self):
        return f"{self.taluka_name} - {self.srno}"

