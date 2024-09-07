from rest_framework import status, views
from rest_framework.response import Response
from .models import Scheme
from .serializers import SchemeSerializer

class SchemeListView(views.APIView):
    def get(self, request):
        schemes = Scheme.objects.all()
        serializer = SchemeSerializer(schemes, many=True)
        return Response(serializer.data)

class SchemeDetailView(views.APIView):
    def get(self, request, id):
        scheme = Scheme.objects.get(id=id)
        serializer = SchemeSerializer(scheme)
        return Response(serializer.data)
