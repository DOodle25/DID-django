from django.shortcuts import render
from django.utils import timezone
from .models import Scheme
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import SchemeSerializer

@api_view(['GET'])
def get_all_schemes(request):
    try:
        schemes = Scheme.objects.all()
        serializer = SchemeSerializer(schemes, many=True)
        if not schemes.exists():
            return Response({
                'message': 'No schemes available.',
            }, status=status.HTTP_404_NOT_FOUND)
        return Response({
            'schemes': serializer.data,
            'message': 'Schemes fetched successfully',
        }, status=status.HTTP_200_OK)
    except Scheme.DoesNotExist:
        return Response({
            'message': 'Scheme model does not exist.',
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({
            'message': f'Request failed: {str(e)}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_scheme_by_name(request, name):
    schemes = Scheme.objects.filter(schemename__icontains=name)
    serializer = SchemeSerializer(schemes, many=True)
    return Response({
        'schemes': serializer.data,
        'message': f'Scheme with name {name} fetched successfully',
    })

@api_view(['GET'])
def get_scheme_by_id(request, id):
    try:
        scheme = Scheme.objects.get(srno=id)
        serializer = SchemeSerializer(scheme)
        return Response({
            'schemes': serializer.data,
            'message': f'Scheme with id {id} fetched successfully',
        })
    except Scheme.DoesNotExist:
        return Response({'message': 'Scheme not found'}, status=404)

@api_view(['POST'])
def add_scheme_details(request):
    scheme_details_array = request.data
    if not isinstance(scheme_details_array, list):
        scheme_details_array = [scheme_details_array]
    for scheme_data in scheme_details_array:
        scheme_data['progress'] = (float(scheme_data['moneyspent']) / float(scheme_data['moneygranted'])) * 100
        scheme_data['timeOfschemeAdded'] = timezone.now().strftime('%H:%M:%S')
        scheme_data['date'] = timezone.now().date()
    serializer = SchemeSerializer(data=scheme_details_array, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'schemes': serializer.data,
            'message': 'Scheme added successfully',
        })
    return Response({'message': 'Invalid data', 'errors': serializer.errors}, status=400)

@api_view(['DELETE','POST'])
def delete_scheme_details(request, id):
    try:
        scheme = Scheme.objects.get(srno=id)
        scheme.delete()
        return Response({
            'message': f'Scheme with id {id} deleted successfully',
        })
    except Scheme.DoesNotExist:
        return Response({'message': 'Scheme not found'}, status=404)

@api_view(['DELETE','POST'])
def delete_scheme_details_by_name(request):
    scheme_names = request.data.get('schemeNames')
    if not isinstance(scheme_names, list):
        scheme_names = [scheme_names]
    deleted_schemes = Scheme.objects.filter(schemename__in=scheme_names)
    count, _ = deleted_schemes.delete()
    return Response({
        'message': f'Schemes with names {scheme_names} deleted successfully',
        'count': count,
    })

@api_view(['DELETE','POST'])
def bulk_delete(request):
    identifiers = request.data.get('identifiers')
    if not isinstance(identifiers, list) or not identifiers:
        return Response({'message': 'Invalid or empty identifiers array.'}, status=400)
    count, _ = Scheme.objects.filter(id__in=identifiers).delete()
    return Response({'message': 'Bulk delete successful', 'count': count})

@api_view(['PUT'])
def update_scheme_details(request, id):
    try:
        scheme = Scheme.objects.get(srno=id)
        updated_data = request.data
        for attr, value in updated_data.items():
            setattr(scheme, attr, value)
        moneyspent = float(updated_data.get('moneyspent', scheme.moneyspent))
        moneygranted = float(updated_data.get('moneygranted', scheme.moneygranted))
        if moneygranted == 0:
            scheme.progress = 0
        else:
            scheme.progress = (moneyspent / moneygranted) * 100
        scheme.save()
        return Response({
            'message': 'Scheme updated successfully',
            'scheme': SchemeSerializer(scheme).data,
        }, status=status.HTTP_200_OK)
    except Scheme.DoesNotExist:
        return Response({'message': 'Scheme not found'}, status=status.HTTP_404_NOT_FOUND)