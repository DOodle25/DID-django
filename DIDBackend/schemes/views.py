# views.py
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Scheme
from .serializers import SchemeSerializer
from django.utils import timezone

@api_view(['GET'])
def get_all_schemes(request):
    schemes = Scheme.objects.all()
    serializer = SchemeSerializer(schemes, many=True)
    return Response({
        'schemes': serializer.data,
        'message': 'Scheme Fetched Successfully',
    })

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
        scheme = Scheme.objects.get(id=id)
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

@api_view(['DELETE'])
def delete_scheme_details(request, id):
    try:
        scheme = Scheme.objects.get(id=id)
        scheme.delete()
        return Response({
            'message': f'Scheme with id {id} deleted successfully',
        })
    except Scheme.DoesNotExist:
        return Response({'message': 'Scheme not found'}, status=404)

@api_view(['DELETE'])
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

@api_view(['DELETE'])
def bulk_delete(request):
    identifiers = request.data.get('identifiers')
    if not isinstance(identifiers, list) or not identifiers:
        return Response({'message': 'Invalid or empty identifiers array.'}, status=400)

    count, _ = Scheme.objects.filter(id__in=identifiers).delete()

    return Response({'message': 'Bulk delete successful', 'count': count})

@api_view(['PUT'])
def update_scheme_details(request):
    updated_scheme_data_array = request.data
    if not isinstance(updated_scheme_data_array, list):
        updated_scheme_data_array = [updated_scheme_data_array]

    for scheme_data in updated_scheme_data_array:
        scheme_id = scheme_data.get('id')
        try:
            scheme = Scheme.objects.get(id=scheme_id)
            scheme_data['lasteditedby'] = request.user.username
            moneyspent = float(scheme_data.get('moneyspent'))
            moneygranted = float(scheme_data.get('moneygranted'))
            if moneygranted == 0:
                scheme_data['progress'] = 0
            else:
                scheme_data['progress'] = (moneyspent / moneygranted) * 100
            for attr, value in scheme_data.items():
                setattr(scheme, attr, value)
            scheme.save()
        except Scheme.DoesNotExist:
            return Response({'message': f'Scheme with id {scheme_id} not found'}, status=404)

    return Response({
        'message': 'Scheme updated successfully',
    })
