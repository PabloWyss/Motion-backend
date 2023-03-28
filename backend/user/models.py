from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']

    email = models.EmailField(unique=True)
    followed_by = models.ManyToManyField(to="User", related_name="following", blank=True)
    username = models.TextField(unique=False)

    def __str__(self):
        return self.username
