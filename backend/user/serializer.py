from rest_framework import serializers
from django.contrib.auth import get_user_model

from user.models import FriendRequest

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'user_permissions')


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'user_permissions')


class FollowersSerializer(serializers.ModelSerializer):
    followed_by = UserSerializer(many=True)

    class Meta:
        model = User
        exclude = ('password', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'user_permissions')


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user_id = UserSerializer(read_only=True, many=True)
    to_user_id = UserSerializer(read_only=True, many=True)

    class Meta:
        model = FriendRequest
        exclude = ('password', 'is_staff', 'is_active', 'date_joined', 'is_superuser', 'user_permissions')
