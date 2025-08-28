from djoser import email
from django.conf import settings



class BaseCustomEmail:
    """Reusable mixin for injecting settings into email templates."""

    def get_context_data(self):
        context = super().get_context_data()
        print("Getting context data for activation email...")
        # Add your settings values
        context["APP_CONTACT_EMAIL"] = settings.APP_CONTACT_EMAIL
        return context

class ActivationEmail(BaseCustomEmail, email.ActivationEmail):
    template_name = 'user/activation.html'
    

class ConfirmationEmail(BaseCustomEmail, email.ConfirmationEmail):
    template_name = 'user/confirmation.html'



class PasswordResetEmail(BaseCustomEmail, email.PasswordResetEmail):
    template_name = 'user/password_reset.html'


class PasswordChangedConfirmationEmail(BaseCustomEmail, email.PasswordChangedConfirmationEmail):
    template_name = 'user/password_changed_confirmation.html'

