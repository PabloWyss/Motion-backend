from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename):
    return f"users/{instance.id}/{filename}"


class User(AbstractUser):

    # Field used for authentication
    USERNAME_FIELD = 'email'

    # Additional fields required when using createsuperuser (USERNAME_FIELD and passwords are always required)
    REQUIRED_FIELDS = ['username']

    # id
    # username
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    avatar = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    banner = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    location = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=50, null=True, blank=True)
    about_me = models.CharField(max_length=100, null=True, blank=True)
    job = models.CharField(max_length=50, null=True, blank=True)
    things_user_likes = models.CharField(max_length=200, null=True, blank=True)
    logged_in_user_followers = models.ManyToManyField('self', symmetrical=False, related_name='following')
    logged_in_user_following = models.ManyToManyField('self', symmetrical=False, related_name='followers')


def __str__(self):
    return self.username
