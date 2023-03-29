from django.contrib import admin
from comment.models import Comment


class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'email', 'approved')

    admin.site.register(Comment)
