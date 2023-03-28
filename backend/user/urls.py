from django.urls import path

from user.views import UserListView, UserRetrieveUpdateDestroyView

# UpdateFollowUsereView, ListFollowersView, ListFollowingView

urlpatterns = [
    path("", UserListView.as_view()),
    path("<int:id>/", UserRetrieveUpdateDestroyView.as_view()),
    # path("followers/toggle-follow/<int:id>/", UpdateFollowUserView.as_view()),
    # path("followers/followers/", ListFollowersView.as_view()),
    # path("followers/following/", ListFollowingView.as_view()),
]
