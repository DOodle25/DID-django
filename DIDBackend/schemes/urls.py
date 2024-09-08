from django.urls import path
from .views import SchemeDataListView, SchemeDataDetailView, SchemeDataBulkDeleteView
from django.http import JsonResponse


urlpatterns = [
    path('getschemes/', SchemeDataListView.as_view(), name='scheme-list'),
    path('schemes/<int:pk>', SchemeDataDetailView.as_view(), name='scheme-detail'),
    path('schemes/bulk-delete', SchemeDataBulkDeleteView.as_view(), name='scheme-bulk-delete'),
]
