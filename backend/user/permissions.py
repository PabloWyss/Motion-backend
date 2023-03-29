from rest_framework.permissions import BasePermission


class IsNotSameUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj != request.user)


class IsOnlyAuthenticatedUser(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)
