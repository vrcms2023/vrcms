from rest_framework import serializers

from common.utility import exclude_fields
from .models import Category, Projects, FeatureAndAmenities, Specifications


# class ProjectCategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProjectCategory
#         fields =['idprojectcategories', 'projectLabel', 'projectValue']

class CategorySerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")


class FeatureAndAmenitiesSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = FeatureAndAmenities
        exclude = ("project",)
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

class SpecificationsSerializer(serializers.ModelSerializer):
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = Specifications       
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")
        exclude = ("project",)



class ProjectsSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    features_amenities = FeatureAndAmenitiesSerializer(required=False)
    specifications = SpecificationsSerializer(many=True, required=False)
    created_by = serializers.CharField(source="created_by.email", read_only=True)
    updated_by = serializers.CharField(source="updated_by.email", read_only=True)

    class Meta:
        model = Projects
        fields = '__all__'
        read_only_fields = ("id", "created_by", "updated_by", "created_at", "updated_at")

    def create(self, validated_data):
        amenities_data = validated_data.pop("features_amenities", None)
        specs_data = validated_data.pop("specifications", [])

        project = Projects.objects.create(**validated_data)

        if amenities_data:
            FeatureAndAmenities.objects.create(project=project, **amenities_data)

        for spec in specs_data:
            Specifications.objects.create(project=project, **spec)

        return project

    def update(self, instance, validated_data):
        amenities_data = validated_data.pop("features_amenities", None)
        specs_data = validated_data.pop("specifications", None)
        new_title = validated_data.get("projectTitle")
        if new_title is not None:
            if new_title == instance.projectTitle:
                # Same as before → ignore
                validated_data.pop("projectTitle", None)
            else:
                # Different → allow updating
                instance.projectTitle = new_title
            
        # update project fields
        for attr, value in validated_data.items():
            if attr != "projectTitle":  # already handled above
                setattr(instance, attr, value)
        instance.save()

        # Replace existing features if provided
        if amenities_data is not None:
            FeatureAndAmenities.objects.update_or_create(
                project=instance, defaults=amenities_data
            )

        # Replace existing specifications if provided
        if specs_data is not None:
            instance.specifications.all().delete()
            for spec in specs_data:
                Specifications.objects.create(project=instance, **spec)

        return instance