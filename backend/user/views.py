# flake8: noqa
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from user.permissions import IsNotSameUser, IsOnlyAuthenticatedUser, IsSameUser
from user.serializer import UserSerializer, UserUpdateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.

class MyUserRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsSameUser]

    def get_object(self):
        return self.request.user


class UserListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()


class UserSearchView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a user based on the query param in url
        """
        queryset = User.objects.all()
        username = self.request.query_params.get("search")
        if username is not None:
            queryset = User.objects.all().filter(user__username=username)
        return queryset


class UserRetrieveUpdateDestroyView(RetrieveAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    permission_classes = [IsAuthenticated, IsNotSameUser]

    # Use different serializers for get and patch methods
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer


class FollowerListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.logged_in_user_followers.all()


class FollowingListView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user.logged_in_user_following.all()


class ToggleFollowUserView(APIView):
    serializer_class = UserSerializer
    permission_classes = [IsOnlyAuthenticatedUser]

    def post(self, request, id):
        target_user_id = id
        target_user = User.objects.filter(id=target_user_id).first()
        logged_in_user = request.user
        is_following = logged_in_user.logged_in_user_following.filter(id=target_user_id).exists()

        if is_following:
            logged_in_user.logged_in_user_following.remove(target_user)
            target_user.logged_in_user_followers.remove(logged_in_user)
            return Response({'status': 'User unfollowed'})
        else:
            logged_in_user.logged_in_user_following.add(target_user)
            target_user.logged_in_user_followers.add(logged_in_user)
            return Response({'status': 'User followed'})
