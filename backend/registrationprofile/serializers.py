from rest_framework import serializers
from registrationprofile.models import RegistrationProfile


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationProfile
        fields = ['validation_code']
