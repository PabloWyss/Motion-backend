from django.contrib.auth import get_user_model
from django.db import models
from post.models import Post

User = get_user_model()

class Comment(models.Model):

        text = models.TextField()
        created = models.DateTimeField(auto_now_add=True)
        updated = models.DateTimeField(auto_now=True)
        approved = models.BooleanField(default=False)
        created_by = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE)
        post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE)

        def approved(self):
            self.approved = True
            self.save()

        def __str__(self):
            return f'Id: {self.id} - {self.created_by} - {self.text}'