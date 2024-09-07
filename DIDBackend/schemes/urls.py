from django.urls import path
from .views import SchemeListView, SchemeDetailView

urlpatterns = [
    path('schemes/', SchemeListView.as_view(), name='schemes_list'),
    path('schemes/<int:id>/', SchemeDetailView.as_view(), name='scheme_detail'),
]
