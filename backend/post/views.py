from rest_framework import filters
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from post.models import Post
from post.permissions import IsSameUser
from post.serializers import PostSerializer
from django.contrib.auth import get_user_model

from post_image.models import Attachment

User = get_user_model()


# Create your views here.

class ListCreatePostView(ListCreateAPIView):
    """
    post:
    Create new Post

    # subtitle
    **User** can make a new *post* by sending post data

    get:
    List all posts

    # subtitle
    Lists all the posts of all users in chronological order
    """
    serializer_class = PostSerializer
    queryset = Post.objects.all().order_by('created')
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        images = self.request.FILES.getlist('image')
        for image in images:
            Attachment.objects.create(post_id=serializer.instance.id, image=image)


class RetrieveUpdateDeletePostView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticatedOrReadOnly, IsSameUser]


class ListLikedPostView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Post.objects.filter(liked_by=self.request.user)


class UpdateLikedPostView(RetrieveUpdateDestroyAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        liked_post_by_user = request.user.posts_liked.all()
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        if instance in liked_post_by_user:
            request.user.posts_liked.remove(instance)
            instance.like_count = instance.liked_by.count()
            instance.save()
            return Response(serializer.data)
        else:
            request.user.posts_liked.add(instance)
            instance.like_count = instance.liked_by.count()
            instance.save()
            return Response(serializer.data)


class listFollowedUserPostPostView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        users_followed = self.request.user.following.all()
        return Post.objects.filter(created_by__in=users_followed)


class listPostOfGivenUserView(ListAPIView):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.OrderingFilter]

    def get_queryset(self):
        user_id = self.kwargs['id']
        return Post.objects.filter(created_by_id=user_id)


class ListMyPostsView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.posts.all().order_by('created')
