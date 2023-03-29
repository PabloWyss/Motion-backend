from rest_framework import serializers
from django.contrib.auth import get_user_model

from user.models import FriendRequest

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class FollowersSerializer(serializers.ModelSerializer):
    followed_by = UserSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'followed_by']


class FriendRequestSerializer(serializers.ModelSerializer):
    from_user_id = UserSerializer(read_only=True, many=True)
    to_user_id = UserSerializer(read_only=True, many=True)

    class Meta:
        model = FriendRequest
        fields = '__all__'
