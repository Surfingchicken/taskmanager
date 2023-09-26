from django.shortcuts import render
from rest_framework import generics, status
from .serializers import TaskSerializer, CreateTaskSerializer,TaskUpdateSerializer
from .models import Task
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 

# Create your views here.
class TaskView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    def getask(self,request, format=None):
        resp = Response(self.serializer_class.data, status=status.HTTP_200_OK)
        return resp
    
class TaskDeleteView(generics.DestroyAPIView):
    queryset=Task.objects.all()
    serializer_class = TaskSerializer
    def deletetask(self,request):
        task_id =self.kwargs['id']
        obj = Task.objects.get(pk=task_id)
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TaskUpdateView(generics.UpdateAPIView,APIView):
    queryset =Task.objects.all()
    serializer_class = TaskUpdateSerializer
    
    def patch(self,request, format=None):
        serializer = self.serializer_class(data=request.data) 
        queryset = Task.objects.all()
        if serializer.is_valid():
            done = serializer.data.get('done')
            task_id = self.kwargs['id'] 
            obj = Task.objects.get(pk=task_id)
            obj.done = done 
            obj.save(update_fields=['done']) 
            return Response(TaskSerializer(obj).data, status=status.HTTP_200_OK) 
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST) 



class CreateTaskView(APIView):
    serializer_class = CreateTaskSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            desc = serializer.data.get('desc')
            queryset =Task.objects.all()
            task = Task(desc = desc,)
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)