from django.urls import path
from .views import (
    add_scheme_details,
    bulk_delete,
    delete_scheme_details,
    delete_scheme_details_by_name,
    get_all_schemes,
    get_scheme_by_id,
    get_scheme_by_name,
    update_scheme_details,
)

urlpatterns = [
    path('addScheme/', add_scheme_details, name='add_scheme'),
    path('bulkdelete/', bulk_delete, name='bulk_delete'),
    path('deletescheme/<int:id>/', delete_scheme_details, name='delete_scheme_details'),
    path('deletescheme/', delete_scheme_details_by_name, name='delete_scheme_details_by_name'),
    path('getschemes/', get_all_schemes, name='get_all_schemes'),
    path('getschemesbyid/<int:id>/', get_scheme_by_id, name='get_scheme_by_id'),
    path('getschemesbyname/<str:name>/', get_scheme_by_name, name='get_scheme_by_name'),
    path('updatescheme/<int:id>/', update_scheme_details, name='update_scheme_details'),
]