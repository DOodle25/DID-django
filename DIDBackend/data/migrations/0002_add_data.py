from django.db import migrations
#! TODO: it should first fetch data from government site then showcase it


# Function to populate taluka population data
def populate_taluka_population(apps, schema_editor):
    TalukaPopulation = apps.get_model('data', 'TalukaPopulation')
    TalukaPopulation.objects.bulk_create([
        TalukaPopulation(taluka_name='Bechraji', total_population=12574),
        TalukaPopulation(taluka_name='Jotana', total_population=7118),
        TalukaPopulation(taluka_name='Kadi', total_population=260934),
        TalukaPopulation(taluka_name='Kheralu', total_population=20143),
        TalukaPopulation(taluka_name='Mahesana', total_population=426997),
        TalukaPopulation(taluka_name='Satlasana', total_population=8002),
        TalukaPopulation(taluka_name='Unjha', total_population=53868),
        TalukaPopulation(taluka_name='Vadnagar', total_population=27790),
        TalukaPopulation(taluka_name='Vijapur', total_population=25558),
        TalukaPopulation(taluka_name='Visnagar', total_population=24000),
        TalukaPopulation(taluka_name='Total', total_population=786384),
    ])
# Function to populate cities data
def add_cities_data(apps, schema_editor):
    CitiesData = apps.get_model('data', 'CitiesData')
    
    cities = [
        {'taluka_name': 'Becharaji', 'no_of_schools': 18, 'no_of_hospitals': 4, 'no_of_colleges': 1, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 1},
        {'taluka_name': 'Jotana', 'no_of_schools': 10, 'no_of_hospitals': 2, 'no_of_colleges': 0, 'no_of_universities': 0, 'no_of_railway_stations': 0, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 0, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 2},
        {'taluka_name': 'Kadi', 'no_of_schools': 32, 'no_of_hospitals': 8, 'no_of_colleges': 2, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 2, 'no_of_police_stations': 1, 'no_of_fire_stations': 1, 'date': '2024-08-18', 'srno': 3},
        {'taluka_name': 'Kheralu', 'no_of_schools': 22, 'no_of_hospitals': 3, 'no_of_colleges': 1, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 4},
        {'taluka_name': 'Mahesana', 'no_of_schools': 60, 'no_of_hospitals': 10, 'no_of_colleges': 5, 'no_of_universities': 1, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 2, 'no_of_police_stations': 3, 'no_of_fire_stations': 1, 'date': '2024-08-18', 'srno': 5},
        {'taluka_name': 'Satlasana', 'no_of_schools': 15, 'no_of_hospitals': 2, 'no_of_colleges': 0, 'no_of_universities': 0, 'no_of_railway_stations': 0, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 6},
        {'taluka_name': 'Unjha', 'no_of_schools': 25, 'no_of_hospitals': 5, 'no_of_colleges': 1, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 7},
        {'taluka_name': 'Vadnagar', 'no_of_schools': 18, 'no_of_hospitals': 3, 'no_of_colleges': 1, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 8},
        {'taluka_name': 'Vijapur', 'no_of_schools': 20, 'no_of_hospitals': 4, 'no_of_colleges': 1, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 1, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 9},
        {'taluka_name': 'Visnagar', 'no_of_schools': 28, 'no_of_hospitals': 6, 'no_of_colleges': 2, 'no_of_universities': 0, 'no_of_railway_stations': 1, 'no_of_bus_stations': 1, 'no_of_post_offices': 1, 'no_of_police_stations': 2, 'no_of_fire_stations': 0, 'date': '2024-08-18', 'srno': 10},
    ]
    
    for city in cities:
        CitiesData.objects.create(**city)

class Migration(migrations.Migration):

    dependencies = [
        ('data', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(populate_taluka_population),
        migrations.RunPython(add_cities_data),
    ]
