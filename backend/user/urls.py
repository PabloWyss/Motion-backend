from django.urls import path

from user.views import UserListView, UserRetrieveUpdateDestroyView, UserSearchView, ToggleFollowUserView, \
    FollowerListView, FollowingListView

urlpatterns = [
    # backend/api/users/
    path("", UserListView.as_view()),
    path("<int:id>/", UserRetrieveUpdateDestroyView.as_view()),
    path("?search=<str:search_string>/", UserSearchView.as_view()),
    # backend/api/social/
    path('followers/toggle-follow/<int:id>/', ToggleFollowUserView.as_view()),
    path('followers/followers/', FollowerListView.as_view()),
    path('followers/following/', FollowingListView.as_view())
]
