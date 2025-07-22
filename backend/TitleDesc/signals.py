# signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from common.BaseModel import ImageUpload

@receiver(post_delete, sender=ImageUpload)
def delete_file_on_delete(sender, instance, **kwargs):
    if instance.path:
        instance.path.delete(False)
