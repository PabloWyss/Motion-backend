from django.db import models

from post.models import Post


def post_image_directory_path(instance, filename):
    return f"posts/{instance.post_id}/{filename}"


class Attachment(models.Model):

    post = models.ForeignKey(to=Post, on_delete=models.CASCADE, related_name='images')

    image = models.ImageField(upload_to=post_image_directory_path, null=True, blank=True)

    class Meta:
        verbose_name = 'Attachment'
        verbose_name_plural = 'Attachments'
