from django.core.mail import send_mail


send_mail(
    'Registration Motion',
    'Registration Motion.',
    'pablopruebadev@gmail.com',
    ['to@example.com'],
    fail_silently=False,
)
