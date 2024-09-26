# from django.db import migrations
# from django.contrib.auth.hashers import make_password
# from django.utils.timezone import now

# def create_users(apps, schema_editor):
#     User = apps.get_model('users', 'User')
    
#     # Roles and emails
#     roles = [
#         {"name": "Admin", "uid": "admin"},
#         {"name": "User", "uid": "user"},
#         {"name": "Manager", "uid": "manager"},
#         {"name": "Supervisor", "uid": "supervisor"}
#     ]

#     emails = [
#         "pdipen135@gmail.com",
#         "210305105302@paruluniversity.ac.in"
#     ]

#     # Password to hash
#     raw_password = 'Pd@1'
#     hashed_password = make_password(raw_password)

#     # Creating 100 users
#     users = []
#     for i in range(100):
#         role = roles[i % len(roles)]  # Cycle through the roles
#         email = emails[i % len(emails)] if i < len(emails) else f'user{i+1}@example.com'  # Use provided emails for first two, then dummy
        
#         user = User(
#             username=f'user{i + 1}',
#             email=email,
#             password=hashed_password,
#             role=role['uid'],
#             first_name=f'FirstName{i + 1}',
#             last_name=f'LastName{i + 1}',
#             is_active=True,
#             is_staff=(role['uid'] == "admin"),  # Only "Admin" role users are marked as staff
#             is_superuser=(role['uid'] == "admin"),  # Only "Admin" role users are superusers
#             date_joined=now(),
#         )
#         users.append(user)

#     # Bulk create users
#     User.objects.bulk_create(users)

# class Migration(migrations.Migration):

#     dependencies = [
#         ('users', '0001_initial'),  # Update this with your latest migration
#     ]

#     operations = [
#         migrations.RunPython(create_users),
#     ]





from django.db import migrations
from django.contrib.auth.hashers import make_password
from django.utils.timezone import now

def create_users(apps, schema_editor):
    User = apps.get_model('users', 'User')
    
    # Roles and emails
    roles = [
        {"name": "Admin", "uid": "admin"},
        {"name": "User", "uid": "user"},
        {"name": "Manager", "uid": "manager"},
        {"name": "Supervisor", "uid": "supervisor"}
    ]

    # Dummy user data
    users_data = [
        {"first_name": "Dipen", "last_name": "Patel", "email": "pdipen135@gmail.com"},
        {"first_name": "Rahul", "last_name": "Patel", "email": "210305105302@paruluniversity.ac.in"},
        {"first_name": "Amit", "last_name": "Sharma", "email": "amit.sharma@example.com"},
        {"first_name": "Priya", "last_name": "Verma", "email": "priya.verma@example.com"},
        {"first_name": "Rohit", "last_name": "Patel", "email": "rohit.patel@example.com"},
        {"first_name": "Anjali", "last_name": "Mehta", "email": "anjali.mehta@example.com"},
        {"first_name": "Suresh", "last_name": "Kumar", "email": "suresh.kumar@example.com"},
        {"first_name": "Sneha", "last_name": "Singh", "email": "sneha.singh@example.com"},
        {"first_name": "Rahul", "last_name": "Reddy", "email": "rahul.reddy@example.com"},
        {"first_name": "Ritu", "last_name": "Gupta", "email": "ritu.gupta@example.com"},
        {"first_name": "Vikas", "last_name": "Yadav", "email": "vikas.yadav@example.com"},
        {"first_name": "Pooja", "last_name": "Joshi", "email": "pooja.joshi@example.com"},
        {"first_name": "Abhishek", "last_name": "Shah", "email": "abhishek.shah@example.com"},
        {"first_name": "Nisha", "last_name": "Bhatia", "email": "nisha.bhatia@example.com"},
        {"first_name": "Arjun", "last_name": "Kapoor", "email": "arjun.kapoor@example.com"},
        {"first_name": "Kiran", "last_name": "Desai", "email": "kiran.desai@example.com"},
        {"first_name": "Ravi", "last_name": "Mishra", "email": "ravi.mishra@example.com"},
        {"first_name": "Meena", "last_name": "Nair", "email": "meena.nair@example.com"},
        {"first_name": "Rajesh", "last_name": "Aggarwal", "email": "rajesh.aggarwal@example.com"},
        {"first_name": "Kavita", "last_name": "Pillai", "email": "kavita.pillai@example.com"},
        {"first_name": "Vikram", "last_name": "Chaudhary", "email": "vikram.chaudhary@example.com"},
        {"first_name": "Neha", "last_name": "Rana", "email": "neha.rana@example.com"},
        {"first_name": "Sandeep", "last_name": "Das", "email": "sandeep.das@example.com"},
        {"first_name": "Lakshmi", "last_name": "Menon", "email": "lakshmi.menon@example.com"},
        {"first_name": "Manish", "last_name": "Jain", "email": "manish.jain@example.com"},
        {"first_name": "Deepika", "last_name": "Sen", "email": "deepika.sen@example.com"},
        {"first_name": "Aditya", "last_name": "Roy", "email": "aditya.roy@example.com"},
        {"first_name": "Sonia", "last_name": "Chopra", "email": "sonia.chopra@example.com"},
        {"first_name": "Vivek", "last_name": "Bhatt", "email": "vivek.bhatt@example.com"},
        {"first_name": "Jyoti", "last_name": "Pandey", "email": "jyoti.pandey@example.com"},
        {"first_name": "Mohit", "last_name": "Iyer", "email": "mohit.iyer@example.com"},
        {"first_name": "Divya", "last_name": "Saxena", "email": "divya.saxena@example.com"},
        {"first_name": "Sunil", "last_name": "Malhotra", "email": "sunil.malhotra@example.com"},
        {"first_name": "Asha", "last_name": "Sinha", "email": "asha.sinha@example.com"},
        {"first_name": "Harish", "last_name": "Nambiar", "email": "harish.nambiar@example.com"},
        {"first_name": "Poonam", "last_name": "Patil", "email": "poonam.patil@example.com"},
        {"first_name": "Rakesh", "last_name": "Chawla", "email": "rakesh.chawla@example.com"},
        {"first_name": "Seema", "last_name": "Kohli", "email": "seema.kohli@example.com"},
        {"first_name": "Aakash", "last_name": "Gupta", "email": "aakash.gupta@example.com"},
        {"first_name": "Vandana", "last_name": "Bose", "email": "vandana.bose@example.com"},
        {"first_name": "Dinesh", "last_name": "Verma", "email": "dinesh.verma@example.com"},
        {"first_name": "Radhika", "last_name": "Kaul", "email": "radhika.kaul@example.com"},
        {"first_name": "Anil", "last_name": "Srivastava", "email": "anil.srivastava@example.com"},
        {"first_name": "Shweta", "last_name": "Khanna", "email": "shweta.khanna@example.com"},
        {"first_name": "Ashok", "last_name": "Bhardwaj", "email": "ashok.bhardwaj@example.com"},
        {"first_name": "Preeti", "last_name": "Dubey", "email": "preeti.dubey@example.com"},
        {"first_name": "Suraj", "last_name": "Kulkarni", "email": "suraj.kulkarni@example.com"},
        {"first_name": "Ragini", "last_name": "Menon", "email": "ragini.menon@example.com"},
        {"first_name": "Raj", "last_name": "Rathore", "email": "raj.rathore@example.com"},
        {"first_name": "Arpita", "last_name": "Shetty", "email": "arpita.shetty@example.com"},
        {"first_name": "Kunal", "last_name": "Singhania", "email": "kunal.singhania@example.com"},
        {"first_name": "Pallavi", "last_name": "Bajpai", "email": "pallavi.bajpai@example.com"},
        {"first_name": "Siddharth", "last_name": "Chatterjee", "email": "siddharth.chatterjee@example.com"},
        {"first_name": "Swati", "last_name": "Pathak", "email": "swati.pathak@example.com"},
        {"first_name": "Gaurav", "last_name": "Narayan", "email": "gaurav.narayan@example.com"},
        {"first_name": "Ruchi", "last_name": "Shukla", "email": "ruchi.shukla@example.com"},
        {"first_name": "Tarun", "last_name": "Prasad", "email": "tarun.prasad@example.com"},
        {"first_name": "Komal", "last_name": "Rao", "email": "komal.rao@example.com"},
        {"first_name": "Shiv", "last_name": "Tiwari", "email": "shiv.tiwari@example.com"},
        {"first_name": "Priyanka", "last_name": "Dutta", "email": "priyanka.dutta@example.com"},
        {"first_name": "Anurag", "last_name": "Mishra", "email": "anurag.mishra@example.com"},
        {"first_name": "Sonia", "last_name": "Naik", "email": "sonia.naik@example.com"},
        {"first_name": "Anil", "last_name": "Dasgupta", "email": "anil.dasgupta@example.com"},
        {"first_name": "Shruti", "last_name": "Deshmukh", "email": "shruti.deshmukh@example.com"},
        {"first_name": "Bharat", "last_name": "Kaur", "email": "bharat.kaur@example.com"},
        {"first_name": "Alok", "last_name": "Nanda", "email": "alok.nanda@example.com"},
        {"first_name": "Sapna", "last_name": "Vij", "email": "sapna.vij@example.com"},
        {"first_name": "Jay", "last_name": "Singh", "email": "jay.singh@example.com"},
        {"first_name": "Ankita", "last_name": "Bedi", "email": "ankita.bedi@example.com"},
        {"first_name": "Dev", "last_name": "Ghosh", "email": "dev.ghosh@example.com"},
        {"first_name": "Rohini", "last_name": "Tripathi", "email": "rohini.tripathi@example.com"},
        {"first_name": "Sagar", "last_name": "Talwar", "email": "sagar.talwar@example.com"},
        {"first_name": "Anjana", "last_name": "Gandhi", "email": "anjana.gandhi@example.com"},
        {"first_name": "Sumit", "last_name": "Kaushik", "email": "sumit.kaushik@example.com"},
        {"first_name": "Deepti", "last_name": "Mathew", "email": "deepti.mathew@example.com"},
        {"first_name": "Akash", "last_name": "Shinde", "email": "akash.shinde@example.com"},
        {"first_name": "Sheetal", "last_name": "Bose", "email": "sheetal.bose@example.com"},
        {"first_name": "Neeraj", "last_name": "Rastogi", "email": "neeraj.rastogi@example.com"},
        {"first_name": "Gayatri", "last_name": "Pawar", "email": "gayatri.pawar@example.com"},
        {"first_name": "Aniket", "last_name": "Guha", "email": "aniket.guha@example.com"},
        {"first_name": "Sonali", "last_name": "Banerjee", "email": "sonali.banerjee@example.com"},
        {"first_name": "Kartik", "last_name": "Mandal", "email": "kartik.mandal@example.com"},
        {"first_name": "Anusha", "last_name": "Dey", "email": "anusha.dey@example.com"},
        {"first_name": "Varun", "last_name": "Puri", "email": "varun.puri@example.com"},
        {"first_name": "Parul", "last_name": "Chakraborty", "email": "parul.chakraborty@example.com"},
        {"first_name": "Santosh", "last_name": "Saxena", "email": "santosh.saxena@example.com"},
        {"first_name": "Ishita", "last_name": "Seth", "email": "ishita.seth@example.com"},
        {"first_name": "Raghav", "last_name": "Roy", "email": "raghav.roy@example.com"},
        {"first_name": "Sunita", "last_name": "Bhat", "email": "sunita.bhat@example.com"},
        {"first_name": "Vinay", "last_name": "Raj", "email": "vinay.raj@example.com"},
        {"first_name": "Lavanya", "last_name": "Agarwal", "email": "lavanya.agarwal@example.com"}
    ]


    # Password to hash
    raw_password = 'Pd@1'
    hashed_password = make_password(raw_password)

    # Creating users
    users = []
    for i, user_data in enumerate(users_data):
        role = roles[i % len(roles)]  # Cycle through the roles
        
        try:
            user = User(
                username=f'user{i + 1}',
                email=user_data['email'],
                password=hashed_password,
                role=role['uid'],
                first_name=user_data['first_name'],
                last_name=user_data['last_name'],
                is_active=True,
                is_staff=(role['uid'] == "admin"),  # Only "Admin" role users are marked as staff
                is_superuser=(role['uid'] == "admin"),  # Only "Admin" role users are superusers
                date_joined=now(),
            )
            users.append(user)
        except Exception as e:
            print(f"Error creating user {i + 1}: {str(e)}")

    # Bulk create users
    if users:
        User.objects.bulk_create(users)

class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),  # Update this with your latest migration
    ]

    operations = [
        migrations.RunPython(create_users),
    ]
