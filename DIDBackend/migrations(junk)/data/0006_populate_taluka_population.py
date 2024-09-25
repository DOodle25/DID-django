from django.db import migrations

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

class Migration(migrations.Migration):

    dependencies = [
        ('data', '0005_talukapopulation'),
    ]

    operations = [
        migrations.RunPython(populate_taluka_population),
    ]
