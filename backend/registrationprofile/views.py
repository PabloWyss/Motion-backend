import json
import random

from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, ListCreateAPIView
from registrationprofile.models import RegistrationProfile
from registrationprofile.serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny

from django.contrib.auth import get_user_model

User = get_user_model()

def code_generator(length=5):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class RegistrationView(ListCreateAPIView):
    serializer_class = RegistrationSerializer
    queryset = RegistrationProfile.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.create(**data)
        user.save()
        validation_code=RegistrationProfile.objects.filter(user_id=user.id).first().validation_code
        send_mail(
            'Registration Motion',
            f'Your code is {validation_code}.',
            f'{data["email"]}',
            ['pablopruebadev@gmail.com'],
            fail_silently=False,
        )
        return JsonResponse({'Email was sent to ': f'{data["email"]}'}, status=201)







