# Generated by Django 4.2.5 on 2024-12-22 07:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testimonials', '0002_testimonials_testimonial_position'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testimonials',
            name='originalname',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]