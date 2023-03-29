from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Comment
from .serializers import CommentSerializer


class CommentListCreateView(ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Comment.objects.all()
        if 'approved' in self.request.query_params:
            queryset = queryset.filter(approved=self.request.query_params['approved'])
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ListCommentByIdView(ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'pk'

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)
