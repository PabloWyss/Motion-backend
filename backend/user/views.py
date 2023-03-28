from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

# from user.permissions import IsNotSameUser
from user.serializer import UserSerializer, UserUpdateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


# Create your views here.
class UserListView(ListAPIView):
    serializer_class = UserSerializer
    # permission_classes = [IsAuthenticated]
    queryset = User.objects.all()


class UserRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    lookup_field = 'id'
    # permission_classes = [IsAuthenticated, IsNotSameUser]

    # Use different serializers for get and patch methods
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer



# class UpdateFollowUserView(RetrieveUpdateDestroyAPIView):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#     lookup_field = 'id'
#     permission_classes = [IsAuthenticated, IsNotSameUser]
#
#     def patch(self, request, *args, **kwargs):
#         followed_users = request.user.following.all()
#         user = self.get_object()
#         serializer = self.get_serializer(user)
#         if user in followed_users:
#             request.user.following.remove(user)
#             return Response(serializer.data)
#         else:
#             request.user.following.add(user)
#             return Response(serializer.data)


# class ListFollowersView(ListAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         return User.objects.filter(following=self.request.user)
#
#
# class ListFollowingView(ListAPIView):
#     serializer_class = UserSerializer
#     permission_classes = [IsAuthenticated]
#
#     def get_queryset(self):
#         return User.objects.filter(followed_by=self.request.user)
