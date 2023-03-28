from rest_framework import serializers
from registrationprofile.models import RegistrationProfile
from user.serializer import UserSerializer


class RegistrationSerializer(serializers.ModelSerializer):
    # user = UserSerializer()
    class Meta:
        model = RegistrationProfile
        fields = ['validation_code']
