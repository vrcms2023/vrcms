from django.apps import AppConfig


class TitledescConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'TitleDesc'

def ready(self):
    import TitleDesc.signals