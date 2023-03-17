from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsNotSameUser(BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj != request.user)
