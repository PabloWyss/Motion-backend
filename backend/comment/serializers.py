from rest_framework import serializers
from .models import Comment
from django.contrib.auth import get_user_model

User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Comment
        fields = ['id', 'text', 'created', 'updated', 'approved', 'created_by', 'post']