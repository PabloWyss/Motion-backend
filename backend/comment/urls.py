from django.urls import path
from .views import CommentListCreateView, ListCommentByIdView

urlpatterns = [
    path('comments/', CommentListCreateView.as_view()),
    path('comments/<int:pk>/', ListCommentByIdView.as_view()),
]
