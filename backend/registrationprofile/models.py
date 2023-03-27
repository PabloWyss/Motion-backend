# Create your models here.
import random

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class RegistrationProfile(models.Model):
    validation_code = models.CharField(max_length=5, default=code_generator)
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='user_registration')

    def __str__(self):
        return f'{self.id} - Reg profile for {self.user.username}'