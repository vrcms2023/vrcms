# services/signals.py
from django.db.models.signals import post_delete
from django.dispatch import receiver
from pagesAdministration.models import PageDetails
from banner.models import Banner

@receiver(post_delete, sender=PageDetails)
def delete_related_banners(sender, instance, **kwargs):
    """
    When a PageDetails record is deleted:
    - Delete related ServiceFeature records (handled by on_delete=CASCADE)
    - Also delete Banners linked to those ServiceFeatures by pageType
    """

        # pageType format: services-<feature.id>-banner
    print(f"Deleting banners for service feature: {instance}")
    Banner.objects.filter(pageType=f"services-{instance.id}-banner").delete()
