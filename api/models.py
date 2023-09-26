from django.db import models
import string
import random

# Create your models here.

class Task(models.Model):
    desc= models.CharField(max_length=80,unique=True)
    done =models.BooleanField(null=False,default=False)
    created_at = models.DateTimeField(auto_now_add=True)

