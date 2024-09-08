from rest_framework import status, views
from rest_framework.response import Response
from .models import SchemeData
from .serializers import SchemeDataSerializer
from django.shortcuts import get_object_or_404

class SchemeDataListView(views.APIView):
    def get(self, request):
        schemes = SchemeData.objects.all()
        serializer = SchemeDataSerializer(schemes, many=True)
        return Response({'schemes': serializer.data, 'message': 'Schemes fetched successfully'}, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = SchemeDataSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'schemes': serializer.data, 'message': 'Schemes added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SchemeDataDetailView(views.APIView):
    def get(self, request, pk):
        scheme = get_object_or_404(SchemeData, pk=pk)
        serializer = SchemeDataSerializer(scheme)
        return Response({'scheme': serializer.data, 'message': f'Scheme with id {pk} fetched successfully'}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        scheme = get_object_or_404(SchemeData, pk=pk)
        if request.user != scheme.leadperson:
            return Response({'message': 'You are not authorized to update this scheme'}, status=status.HTTP_403_FORBIDDEN)
        serializer = SchemeDataSerializer(scheme, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'scheme': serializer.data, 'message': 'Scheme updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        scheme = get_object_or_404(SchemeData, pk=pk)
        if request.user != scheme.leadperson:
            return Response({'message': 'You are not authorized to delete this scheme'}, status=status.HTTP_403_FORBIDDEN)
        scheme.delete()
        return Response({'message': f'Scheme with id {pk} deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class SchemeDataBulkDeleteView(views.APIView):
    def delete(self, request):
        ids = request.data.get('identifiers', [])
        if not ids:
            return Response({'message': 'No identifiers provided'}, status=status.HTTP_400_BAD_REQUEST)
        schemes = SchemeData.objects.filter(id__in=ids)
        schemes.delete()
        return Response({'message': 'Bulk delete successful'}, status=status.HTTP_204_NO_CONTENT)
