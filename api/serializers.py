from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =('id','desc','done','created_at')


class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields =('desc',)

class TaskUpdateSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Task
        fields =('done','id')