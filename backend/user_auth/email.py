from djoser import email


class ActivationEmail(email.ActivationEmail):
    template_name = 'user/activation.html'


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'user/confirmation.html'


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'user/password_reset.html'


class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = 'user/password_changed_confirmation.html'
