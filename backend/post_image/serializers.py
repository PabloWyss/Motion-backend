from rest_framework import serializers
from post_image.models import Attachment


class PostImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Attachment
        fields = '__all__'

