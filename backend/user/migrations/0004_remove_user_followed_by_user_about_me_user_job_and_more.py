# Generated by Django 4.1.7 on 2023-03-28 08:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_remove_user_users_followed_user_followed_by'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='followed_by',
        ),
        migrations.AddField(
            model_name='user',
            name='about_me',
            field=models.CharField(default='no value', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='job',
            field=models.CharField(default='no value', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='location',
            field=models.CharField(default='no value', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='phone_number',
            field=models.CharField(default='no value', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='user',
            name='things_user_likes',
            field=models.CharField(default='no value', max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=50),
        ),
    ]
