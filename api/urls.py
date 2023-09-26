from django.urls import path
from .views import TaskView, CreateTaskView, TaskDeleteView, TaskUpdateView
urlpatterns = [
    path('tasks', TaskView.as_view()),
    path('create-task', CreateTaskView.as_view()),
    path('tasks/<int:pk>', TaskDeleteView.as_view()),
    path('update/<int:pk>', TaskUpdateView.as_view()),
]