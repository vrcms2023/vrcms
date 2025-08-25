from rest_framework import serializers
from .models import *
from common.utility import exclude_fields
import re
import os
from moviepy import VideoFileClip
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import uuid
import tempfile
from PIL import Image
import numpy as np


class VideoGallerySerializer(serializers.ModelSerializer):
      class Meta:
        model = VideoGallery
        fields = '__all__'

      
      # def validate(self, data):
      #   if not data.get("path") and not data.get("video_WebURL"):
      #       raise serializers.ValidationError("Either video file or URL is required.")
      #   return data
     
      def validate_url(self, value):
        # Basic YouTube URL check
        regex = r'(?:v=|\/)([0-9A-Za-z_-]{11}).*'
        match = re.search(regex, value)
        if not match:
            raise serializers.ValidationError("Invalid YouTube URL")
        return value

      def create(self, validated_data):
        video_file = validated_data.get("path")
        youtube_url = validated_data.get("video_WebURL")       

        if video_file:
            # Generate thumbnail from uploaded video
            thumb_path = self.generate_thumbnail(video_file)
            validated_data["video_thumbnail_url"] = thumb_path
        elif youtube_url:
            video_id = self.extract_video_id(youtube_url)
            validated_data["video_id"] = video_id
            validated_data["video_thumbnail_url"] = f"https://img.youtube.com/vi/{video_id}/hqdefault.jpg"
      
        
        return super().create(validated_data)
      

      def update(self, instance, validated_data):
              path = validated_data.get('path', None)
              if path and not hasattr(path, 'file'):
                validated_data.pop('path')  # It's a string, not a file upload

              return super().update(instance, validated_data)




      def extract_video_id(self, url):
        match = re.search(r"(?:v=|\/)([0-9A-Za-z_-]{11})", url)
        return match.group(1) if match else ""

      def generate_thumbnail(self, video_file):
        try:         

            # Save uploaded file to a temp location
            with tempfile.NamedTemporaryFile(suffix=".mp4", delete=False) as temp_video:
                for chunk in video_file.chunks():
                    temp_video.write(chunk)
                temp_video_path = temp_video.name

            # Load clip & capture frame
            clip = VideoFileClip(temp_video_path)
            frame = clip.get_frame(1)  # capture at 1 second
            clip.close()

            # Convert frame to image
            image = Image.fromarray(np.uint8(frame))
            filename = f"thumb_{uuid.uuid4().hex}.jpg"
            temp_thumb = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
            image.save(temp_thumb.name, format="JPEG")

            # Save to media storage
            from django.core.files import File
            with open(temp_thumb.name, 'rb') as f:
                file_content = File(f)
                storage_path = f"thumbnails/{filename}"
                default_storage.save(storage_path, file_content)

            return default_storage.url(storage_path)
        except Exception as e:
            raise serializers.ValidationError(f"Thumbnail generation failed: {str(e)}")


class ImageGallerySerializer(serializers.ModelSerializer):
      class Meta:
        model = ImageGallery
        fields = '__all__'

      # def validate(self, data):
      #   if not data.get('path') and not data.get('image_WebURL'):
      #       raise serializers.ValidationError("Provide at least one of image, or image_url.")
      #   return data