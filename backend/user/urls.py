from django.urls import path

from user.views import UserListView, UserRetrieveUpdateDestroyView, UserSearchView, ToggleFollowUserView, \
    FollowerListView, FollowingListView, MyUserRetrieveUpdateDeleteView, ToggleFriendRequestView, \
    UpdateFriendRequestView, FriendsListView, FriendsRequestsListView

urlpatterns = [
    # backend/api/users/
    path("", UserListView.as_view()),
    path("me/", MyUserRetrieveUpdateDeleteView.as_view()),
    path("<int:id>/", UserRetrieveUpdateDestroyView.as_view()),
    path("?search=<str:search_string>/", UserSearchView.as_view()),
    # backend/api/social/
    path('followers/toggle-follow/<int:id>/', ToggleFollowUserView.as_view()),
    path('followers/followers/', FollowerListView.as_view()),
    path('followers/following/', FollowingListView.as_view()),
    path('friends/request/<int:id>/', ToggleFriendRequestView.as_view()),
    path('friends/requests/<int:id>/', UpdateFriendRequestView.as_view()),
    path('friends/requests/', FriendsRequestsListView.as_view()),
    path('friends/', FriendsListView.as_view())
]
