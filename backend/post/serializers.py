from rest_framework import serializers

from post.models import Post
from user.serializer import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    liked_by = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Post
        fields = '__all__'


class PostLijedSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'
