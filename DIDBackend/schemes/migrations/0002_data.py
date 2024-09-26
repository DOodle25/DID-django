# from django.db import migrations
# from decimal import Decimal
# from datetime import datetime, timedelta
# import random

# def create_dummy_data(apps, schema_editor):
#     Scheme = apps.get_model('schemes', 'Scheme')
#     SchemeChangeLog = apps.get_model('schemes', 'SchemeChangeLog')
#     SchemeTeamMember = apps.get_model('schemes', 'SchemeTeamMember')

#     # Define sample data for schemes
#     places = [
#         "Bechraji", "Jotana", "Kadi", "Kheralu",
#         "Mahesana", "Satlasana", "Unjha", "Vadnagar",
#         "Vijapur", "Visnagar", "Gujarat", "India"
#     ]
    
#     statuses = [
#         "Approved", "Pending Approval", "In Progress", "Completed", "Pending"
#     ]

#     scheme_names = [
#         "Sujalam Sufalam", "Mukhya Mantri Kisan Sahay Yojana", 
#         "Gujarat Agro Industries Corporation", "Gujarat Urban Development Mission",
#         "Sardar Patel Awas Yojana", "Kanya Kelavani Nidhi", 
#         "Shivraj Singh Chouhan Gramin Vikas Yojana", "Gujarat State Employment Guarantee Scheme"
#     ]

#     descriptions = [
#         "A scheme to promote irrigation and agriculture.",
#         "Financial assistance to farmers to ensure crop yield.",
#         "Supporting agro-industries in Gujarat.",
#         "Urban development projects to enhance infrastructure.",
#         "Affordable housing for economically weaker sections.",
#         "A fund for the education of girl children.",
#         "Development initiatives for rural areas.",
#         "Providing guaranteed employment in rural areas."
#     ]
    
#     emails = [
#         "pdipen135@gmail.com", "210305105302@paruluniversity.ac.in", 
#         "amit.sharma@example.com", "priya.verma@example.com", 
#         "rohit.patel@example.com", "anjali.mehta@example.com",
#         "suresh.kumar@example.com", "sneha.singh@example.com", 
#         "rahul.reddy@example.com", "ritu.gupta@example.com"
#     ]
    
#     # Create a sample scheme
#     scheme = Scheme.objects.create(
#         schemename=random.choice(scheme_names),
#         ministry="Ministry of Agriculture",
#         desc=random.choice(descriptions),
#         place=random.choice(places),
#         moneygranted=Decimal('10000.00'),
#         moneyspent=Decimal('0.00'),
#         status=random.choice(statuses),
#         progress=0.0,
#         leadperson="John Doe",
#         lasteditedby="admin@example.com",
#         timeOfschemeAdded=datetime.now().time(),
#         date=datetime.now().date()
#     )

#     # Create change logs for the scheme
#     moneyspent = Decimal('0.00')
#     for i in range(10):
#         # Randomize money spent for each iteration
#         spent_amount = random.uniform(50, 500)  # Random amount between 50 and 500
#         moneyspent += Decimal(spent_amount)
        
#         # Ensure it does not exceed granted amount
#         if moneyspent > scheme.moneygranted:
#             moneyspent = scheme.moneygranted

#         # Update the scheme with new values based on the log
#         scheme.moneyspent = moneyspent
#         scheme.progress = (moneyspent / scheme.moneygranted) * 100  # Calculate progress
#         scheme.schemename = random.choice(scheme_names)
#         scheme.ministry = "Ministry of Development"
#         scheme.desc = random.choice(descriptions)
#         scheme.place = random.choice(places)
#         scheme.status = random.choice(statuses)
        
#         # Save the updated scheme
#         scheme.save()

#         # Randomize the change log time within the last year
#         change_time = datetime.now() - timedelta(days=random.randint(0, 365), seconds=random.randint(0, 86400 * 365))

#         # Create a change log
#         change_log = SchemeChangeLog.objects.create(
#             scheme=scheme,
#             changed_by=random.choice(emails),
#             change_time=change_time,  # Use the randomized change time
#             changes=(f"moneyspent changed from {moneyspent - Decimal(spent_amount):.2f} to {moneyspent:.2f}, "
#                      f"schemename changed to '{scheme.schemename}', "
#                      f"ministry changed to '{scheme.ministry}', "
#                      f"desc changed to '{scheme.desc}', "
#                      f"place changed to '{scheme.place}', "
#                      f"status changed to '{scheme.status}', "
#                      f"progress updated to {scheme.progress:.2f}%")
#         )

#         # Add the person who made the change to the team of the scheme
#         team_member_email = change_log.changed_by
#         SchemeTeamMember.objects.get_or_create(scheme=scheme, user_email=team_member_email)

# class Migration(migrations.Migration):

#     dependencies = [
#         ('schemes', '0001_initial_squashed_0003_schemechangelog_schemeteammember'),  # Adjust based on your last migration
#     ]

#     operations = [
#         migrations.RunPython(create_dummy_data),
#     ]



from django.db import migrations
from decimal import Decimal
from datetime import datetime, timedelta
import random

def create_dummy_data(apps, schema_editor):
    Scheme = apps.get_model('schemes', 'Scheme')
    SchemeChangeLog = apps.get_model('schemes', 'SchemeChangeLog')
    SchemeTeamMember = apps.get_model('schemes', 'SchemeTeamMember')

    # Define sample data for schemes
    places = [
        "Bechraji", "Jotana", "Kadi", "Kheralu",
        "Mahesana", "Satlasana", "Unjha", "Vadnagar",
        "Vijapur", "Visnagar", "Gujarat", "India"
    ]
    
    statuses = [
        "Approved", "Pending Approval", "In Progress", "Completed", "Pending"
    ]

# Scheme Names (100 Gujarat Government Schemes)
    scheme_names = [
        "Sujalam Sufalam", "Mukhya Mantri Kisan Sahay Yojana", 
        "Gujarat Agro Industries Corporation", "Gujarat Urban Development Mission",
        "Sardar Patel Awas Yojana", "Kanya Kelavani Nidhi", 
        "Shivraj Singh Chouhan Gramin Vikas Yojana", "Gujarat State Employment Guarantee Scheme",
        "Pradhan Mantri Awas Yojana", "Mahatma Gandhi National Rural Employment Guarantee Act",
        "Atal Mission for Rejuvenation and Urban Transformation", "Gujarat Skill Development Mission",
        "Gujarat Health Scheme", "Mukhyamantri Amrutum Yojana", 
        "Beti Bachao Beti Padhao", "Integrated Child Development Services",
        "Swachh Bharat Mission", "Digital Gujarat", 
        "Gujarat State Farmers' Loan Waiver Scheme", "Chief Minister's Assistance Scheme",
        "Gujarat Livelihood Promotion Company", "Kisan Credit Card Scheme", 
        "National Agriculture Market", "Pradhan Mantri Fasal Bima Yojana",
        "Ayushman Bharat", "Skill India", 
        "Gujarat Chief Minister's Land Development Scheme", "Gujarat Fisheries Policy",
        "Women Entrepreneurship Development Programme", "Gujarat Agricultural University Scheme",
        "Gujarat State Rural Livelihood Mission", "Mukhya Mantri Solar Agriculture Pump Yojana",
        "Mukhyamantri Yuva Swavalamban Yojana", "Gujarat Information Technology Policy",
        "Gujarat State Minority Finance and Development Corporation", 
        "Gujarat Agricultural Development Scheme", "Gujarat Comprehensive Health Insurance Scheme",
        "State Employment Mission", "Shri Ram Janmabhoomi Teerth Kshetra Trust",
        "Gujarat Cow Protection Policy", "Mahatma Gandhi Sarbat Vikas Yojana",
        "Gujarat Start-Up Policy", "Chief Minister's Community Development Scheme",
        "E-Khata Registration Scheme", "Gujarat Green Energy Policy",
        "Gujarat State Biofuel Policy", "Gujarat Agri-Business Policy",
        "Gujarat Solar Power Policy", "Gujarat Industrial Policy",
        "Gujarat Textile Policy", "Gujarat Cooperative Policy",
        "Gujarat Water Supply and Sewerage Management Policy", "Gujarat Digital Payment Scheme",
        "Rural Infrastructure Development Fund", "Gujarat Forest Policy",
        "Gujarat Urban Transport Policy", "Gujarat Coastal Management Policy",
        "Gujarat Renewable Energy Policy", "Gujarat Housing Policy",
        "Gujarat Public Distribution System", "Gujarat Labour Policy",
        "Gujarat Information Commission Policy", "Gujarat Road Safety Policy",
        "Gujarat Climate Change Policy", "Gujarat Disaster Management Policy",
        "Gujarat Child Protection Policy", "Gujarat Health and Family Welfare Policy",
        "Gujarat Women's Empowerment Policy", "Gujarat Senior Citizens Policy",
        "Gujarat Youth Policy", "Gujarat Heritage Policy",
        "Gujarat Skill Training Policy", "Gujarat Investment Policy",
        "Gujarat Sports Policy", "Gujarat Education Policy",
        "Gujarat Agricultural Extension Policy", "Gujarat Fisheries Policy",
        "Gujarat Handicraft Policy", "Gujarat Entrepreneurship Policy",
        "Gujarat Urban Development Policy", "Gujarat Forest Development Policy",
        "Gujarat Water Resources Management Policy", "Gujarat Transport Policy",
        "Gujarat Mining Policy", "Gujarat Science and Technology Policy",
        "Gujarat Small Scale Industries Policy", "Gujarat Power Policy",
        "Gujarat Urban Housing Policy", "Gujarat Air Quality Management Policy",
        "Gujarat Organic Farming Policy", "Gujarat Dairy Development Policy",
        "Gujarat Poultry Development Policy", "Gujarat Renewable Energy Generation Policy"
    ]

# Dummy Descriptions (100)
    descriptions = [
        "A scheme to promote irrigation and agriculture.",
        "Financial assistance to farmers to ensure crop yield.",
        "Supporting agro-industries in Gujarat.",
        "Urban development projects to enhance infrastructure.",
        "Affordable housing for economically weaker sections.",
        "A fund for the education of girl children.",
        "Development initiatives for rural areas.",
        "Providing guaranteed employment in rural areas.",
        "Housing for the economically weaker sections.",
        "Support for rural artisans and craftspeople.",
        "Skill training for youth to enhance employability.",
        "Enhancing urban infrastructure for better living standards.",
        "Promoting renewable energy solutions.",
        "Healthcare initiatives for improved access.",
        "Financial aid for education.",
        "Promoting gender equality and empowerment.",
        "Child development programs for nutrition and education.",
        "Sanitation and cleanliness initiatives.",
        "Digital initiatives for e-governance.",
        "Loan waivers for farmers facing distress.",
        "Financial assistance for various projects.",
        "Supporting fisheries and aquaculture.",
        "Financial support for women's enterprises.",
        "Educational initiatives in agriculture.",
        "Livelihood programs for rural communities.",
        "Solar energy for agricultural use.",
        "Financial aid for youth entrepreneurs.",
        "Promoting IT and digital innovations.",
        "Supporting minority communities in development.",
        "Fostering agricultural development.",
        "Health insurance for families.",
        "Job creation initiatives.",
        "Promoting religious tourism.",
        "Protecting cows and promoting dairy.",
        "Comprehensive development for communities.",
        "Startup incubators and funding.",
        "Supporting community development initiatives.",
        "Online land registration services.",
        "Promoting green energy solutions.",
        "Fostering biofuel development.",
        "Supporting agri-business initiatives.",
        "Promoting solar energy adoption.",
        "Encouraging industrial growth.",
        "Supporting textile industries.",
        "Promoting cooperative societies.",
        "Improving water supply management.",
        "Facilitating digital payments.",
        "Rural infrastructure improvements.",
        "Forest conservation and development.",
        "Urban transport enhancements.",
        "Coastal area management initiatives.",
        "Promoting renewable energy projects.",
        "Providing affordable housing options.",
        "Improving public distribution systems.",
        "Labour welfare initiatives.",
        "Enhancing transparency in governance.",
        "Road safety measures and initiatives.",
        "Climate change adaptation strategies.",
        "Disaster preparedness and response.",
        "Child protection and welfare programs.",
        "Health and family welfare initiatives.",
        "Empowerment of women in various sectors.",
        "Support for senior citizens.",
        "Youth development programs.",
        "Preserving and promoting heritage.",
        "Skill development training programs.",
        "Encouraging investment in various sectors.",
        "Promoting sports and physical activities.",
        "Improving educational infrastructure.",
        "Extending agricultural support services.",
        "Enhancing fisheries and aquaculture development.",
        "Promoting handicrafts and artisans.",
        "Encouraging entrepreneurship across sectors.",
        "Developing urban areas for better living.",
        "Forest management and conservation efforts.",
        "Water resource management projects.",
        "Enhancing transport and connectivity.",
        "Sustainable mining practices.",
        "Promoting science and technology initiatives.",
        "Supporting small-scale industries.",
        "Ensuring power availability and management.",
        "Urban housing development projects.",
        "Improving air quality and pollution management.",
        "Promoting organic farming practices.",
        "Supporting dairy and livestock development.",
        "Enhancing poultry farming initiatives.",
        "Renewable energy generation programs."
    ]
    
    emails = [
        "pdipen135@gmail.com",
        "210305105302@paruluniversity.ac.in",
        "amit.sharma@example.com",
        "priya.verma@example.com",
        "rohit.patel@example.com",
        "anjali.mehta@example.com",
        "suresh.kumar@example.com",
        "sneha.singh@example.com",
        "rahul.reddy@example.com",
        "ritu.gupta@example.com",
        "vikas.yadav@example.com",
        "pooja.joshi@example.com",
        "abhishek.shah@example.com",
        "nisha.bhatia@example.com",
        "arjun.kapoor@example.com",
        "kiran.desai@example.com",
        "ravi.mishra@example.com",
        "meena.nair@example.com",
        "rajesh.aggarwal@example.com",
        "kavita.pillai@example.com",
        "vikram.chaudhary@example.com",
        "neha.rana@example.com",
        "sandeep.das@example.com",
        "lakshmi.menon@example.com",
        "manish.jain@example.com",
        "deepika.sen@example.com",
        "aditya.roy@example.com",
        "sonia.chopra@example.com",
        "vivek.bhatt@example.com",
        "jyoti.pandey@example.com",
        "mohit.iyer@example.com",
        "divya.saxena@example.com",
        "sunil.malhotra@example.com",
        "asha.sinha@example.com",
        "harish.nambiar@example.com",
        "poonam.patil@example.com",
        "rakesh.chawla@example.com",
        "seema.kohli@example.com",
        "aakash.gupta@example.com",
        "vandana.bose@example.com",
        "dinesh.verma@example.com",
        "radhika.kaul@example.com",
        "anil.srivastava@example.com",
        "shweta.khanna@example.com",
        "ashok.bhardwaj@example.com",
        "preeti.dubey@example.com",
        "suraj.kulkarni@example.com",
        "ragini.menon@example.com",
        "raj.rathore@example.com",
        "arpita.shetty@example.com",
        "kunal.singhania@example.com",
        "pallavi.bajpai@example.com",
        "siddharth.chatterjee@example.com",
        "swati.pathak@example.com",
        "gaurav.narayan@example.com",
        "ruchi.shukla@example.com",
        "tarun.prasad@example.com",
        "komal.rao@example.com",
        "shiv.tiwari@example.com",
        "priyanka.dutta@example.com",
        "anurag.mishra@example.com",
        "sonia.naik@example.com",
        "anil.dasgupta@example.com",
        "shruti.deshmukh@example.com",
        "bharat.kaur@example.com",
        "alok.nanda@example.com",
        "sapna.vij@example.com",
        "jay.singh@example.com",
        "ankita.tiwari@example.com",
        "dheeraj.verma@example.com",
        "geeta.khan@example.com",
        "nitin.gupta@example.com",
        "naina.kapoor@example.com",
        "puneet.malik@example.com",
        "lata.chopra@example.com",
        "rishabh.mehta@example.com",
    ]
    lead_names = [
        "pdipen135@gmail.com",
        "210305105302@paruluniversity.ac.in",
        "amit.sharma@example.com",
        "priya.verma@example.com",
        "rohit.patel@example.com",
        "anjali.mehta@example.com",
        "suresh.kumar@example.com",
        "sneha.singh@example.com",
        "rahul.reddy@example.com",
        "ritu.gupta@example.com",
        "vikas.yadav@example.com",
        "pooja.joshi@example.com",
        "abhishek.shah@example.com",
        "nisha.bhatia@example.com",
        "arjun.kapoor@example.com",
        "kiran.desai@example.com",
        "ravi.mishra@example.com",
        "meena.nair@example.com",
        "rajesh.aggarwal@example.com",
        "kavita.pillai@example.com",
        "vikram.chaudhary@example.com",
        "neha.rana@example.com",
        "sandeep.das@example.com",
        "lakshmi.menon@example.com",
        "manish.jain@example.com",
        "deepika.sen@example.com",
        "aditya.roy@example.com",
        "sonia.chopra@example.com",
        "vivek.bhatt@example.com",
        "jyoti.pandey@example.com",
        "mohit.iyer@example.com",
        "divya.saxena@example.com",
        "sunil.malhotra@example.com",
        "asha.sinha@example.com",
        "harish.nambiar@example.com",
        "poonam.patil@example.com",
        "rakesh.chawla@example.com",
        "seema.kohli@example.com",
        "aakash.gupta@example.com",
        "vandana.bose@example.com",
        "dinesh.verma@example.com",
        "radhika.kaul@example.com",
        "anil.srivastava@example.com",
        "shweta.khanna@example.com",
        "ashok.bhardwaj@example.com",
        "preeti.dubey@example.com",
        "suraj.kulkarni@example.com",
        "ragini.menon@example.com",
        "raj.rathore@example.com",
        "arpita.shetty@example.com",
        "kunal.singhania@example.com",
        "pallavi.bajpai@example.com",
        "siddharth.chatterjee@example.com",
        "swati.pathak@example.com",
        "gaurav.narayan@example.com",
        "ruchi.shukla@example.com",
        "tarun.prasad@example.com",
        "komal.rao@example.com",
        "shiv.tiwari@example.com",
        "priyanka.dutta@example.com",
        "anurag.mishra@example.com",
        "sonia.naik@example.com",
        "anil.dasgupta@example.com",
        "shruti.deshmukh@example.com",
        "bharat.kaur@example.com",
        "alok.nanda@example.com",
        "sapna.vij@example.com",
        "jay.singh@example.com",
        "ankita.tiwari@example.com",
        "dheeraj.verma@example.com",
        "geeta.khan@example.com",
        "nitin.gupta@example.com",
        "naina.kapoor@example.com",
        "puneet.malik@example.com",
        "lata.chopra@example.com",
        "rishabh.mehta@example.com",
    ]
    money_granted = [
        '10000', '12000', '15000', '20000', '25000', '30000', '35000', '40000', '45000', '50000',
        '55000', '60000', '65000', '70000', '75000', '80000', '85000', '90000', '95000', '100000'
    ]

    ministries = [
        "Ministry of Agriculture", "Ministry of Development", "Ministry of Health",
        "Ministry of Education", "Ministry of Finance", "Ministry of Rural Development",
        "Ministry of Urban Development", "Ministry of Women and Child Development",
        "Ministry of Environment", "Ministry of Science and Technology"
    ]
    # Create multiple sample schemes
    for _ in range(1000):  # Generate 10 dummy schemes
        # Create a sample scheme
        scheme = Scheme.objects.create(
            schemename=random.choice(scheme_names),
            ministry=random.choice(ministries),
            desc=random.choice(descriptions),
            place=random.choice(places),
            moneygranted=Decimal(random.choice(money_granted)),
            moneyspent=Decimal('0.00'),
            status=random.choice(statuses),
            progress=0.0,
            leadperson=random.choice(lead_names),
            lasteditedby=random.choice(emails),
            timeOfschemeAdded=datetime.now().time(),
            date=datetime.now().date()
        )

        # Start date for the change logs (e.g., 30 days ago)
        start_date = datetime.now() - timedelta(days=30)

        # Create change logs for the scheme
        moneyspent = Decimal('0.00')
        for i in range(15):  # Create 10 change logs
            # Randomize money spent for each iteration
            spent_amount = random.uniform(50, 500)  # Random amount between 50 and 500
            moneyspent += Decimal(spent_amount)

            # Ensure it does not exceed granted amount
            if moneyspent > scheme.moneygranted:
                moneyspent = scheme.moneygranted

            # Update the scheme with new values based on the log
            scheme.moneyspent = moneyspent
            scheme.progress = (moneyspent / scheme.moneygranted) * 100  # Calculate progress
            scheme.schemename = random.choice(scheme_names)
            scheme.ministry = random.choice(ministries)
            scheme.desc = random.choice(descriptions)
            scheme.place = random.choice(places)
            scheme.status = random.choice(statuses)
            
            # Save the updated scheme
            scheme.save()

            # Increment the change log time by a day and a random time for each log
            change_date = start_date + timedelta(days=i)
            change_time = change_date.replace(hour=random.randint(0, 23), minute=random.randint(0, 59), second=random.randint(0, 59))

            # Create a change log
            change_log = SchemeChangeLog.objects.create(
                scheme=scheme,
                changed_by=random.choice(emails),
                change_time=change_time,  # Use the incremented change time
                changes=(f"moneyspent changed from {moneyspent - Decimal(spent_amount):.2f} to {moneyspent:.2f}, "
                         f"schemename changed to '{scheme.schemename}', "
                         f"ministry changed to '{scheme.ministry}', "
                         f"desc changed to '{scheme.desc}', "
                         f"place changed to '{scheme.place}', "
                         f"status changed to '{scheme.status}', "
                         f"progress updated to {scheme.progress:.2f}%")
            )

            # Update the lasteditedby field to the email of the last person who made the change
            scheme.lasteditedby = change_log.changed_by
            scheme.save()  # Save the updated scheme with the new lasteditedby

            # Add the person who made the change to the team of the scheme
            team_member_email = change_log.changed_by
            SchemeTeamMember.objects.get_or_create(scheme=scheme, user_email=team_member_email)

class Migration(migrations.Migration):

    dependencies = [
        ('schemes', '0001_initial_squashed_0003_schemechangelog_schemeteammember'),  # Adjust based on your last migration
    ]

    operations = [
        migrations.RunPython(create_dummy_data),
    ]
