from django.urls import path

from post.views import ListCreatePostView, RetrieveUpdateDeletePostView, UpdateLikedPostView, ListLikedPostView, \
    listFollowedUserPostPostView, listPostOfGivenUserView, ListMyPostsView

urlpatterns = [
    path("", ListCreatePostView.as_view()),
    path("<int:id>/", RetrieveUpdateDeletePostView.as_view()),
    path("likes/", ListLikedPostView.as_view()),
    path("toggle-like/<int:id>/", UpdateLikedPostView.as_view()),
    path("following/", listFollowedUserPostPostView.as_view()),
    path("user/<int:id>/", listPostOfGivenUserView.as_view()),
    path("me/", ListMyPostsView.as_view()),
]
