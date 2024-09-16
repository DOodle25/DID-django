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

# New model for tracking team members who made edits
class SchemeTeamMember(models.Model):
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, related_name='team_members')
    user_email = models.EmailField()  # Email of the user who made changes
    added_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the user was added

    def __str__(self):
        return f"{self.user_email} for {self.scheme.schemename}"

# New model for logging scheme changes
class SchemeChangeLog(models.Model):
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE, related_name='change_logs')
    changed_by = models.EmailField()  # Email of the user who made the change
    change_time = models.DateTimeField(auto_now_add=True)  # Time when the change was made
    changes = models.TextField()  # Details of what was changed (e.g., "moneyspent changed from X to Y")

    def __str__(self):
        return f"Changes in {self.scheme.schemename} by {self.changed_by} on {self.change_time}"