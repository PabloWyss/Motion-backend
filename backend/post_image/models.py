from django.db import models

class Attachment(DatetimeCreatedMixin, AuthorMixin):
    class AttachmentType(models.TextChoices):
        PHOTO = "Photo", _("Photo")
        VIDEO = "Video", _("Video")

    file = models.ImageField('Attachment', upload_to='attachments/')
    file_type = models.CharField('File type', choices=AttachmentType.choices, max_length=10)

    post_images = models.ForeignKey(to='Post', on_delete=models.CASCADE, verbose_name='post')

    class Meta:
        verbose_name = 'Attachment'
        verbose_name_plural = 'Attachments'
