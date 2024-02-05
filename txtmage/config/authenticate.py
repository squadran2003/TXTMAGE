from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.db.models import Q


class EmailBackend(BaseBackend):
    """
    Authenticate against the email and username.
    """

    def authenticate(self, request, username=None, password=None):
        try:
            user = User.objects.get(
                Q(username__iexact=username) | Q(email__iexact=username)
            )
        except User.DoesNotExist:
            return None
        if user.check_password(password):
            return user
        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
