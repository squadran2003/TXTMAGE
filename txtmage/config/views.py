from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.contrib.auth import login, logout
from config.authenticate import EmailBackend
from django.shortcuts import render, redirect
from rest_framework.permissions import IsAuthenticated
from decouple import config, Csv
from openai import OpenAI

client = OpenAI(
    api_key=config("OPENAPI_KEY"),
)


class ImageGenerateList(APIView):
    permission_classes = [IsAuthenticated]


    def post(self, request, format=None):
        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=request.data["message"],
                size="1024x1024",
                quality="standard",
                n=1,
            )
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        image_url = response.data[0].url
        return Response([image_url], status=status.HTTP_201_CREATED)


def index(request):
    if not request.user.is_authenticated:
        return render(request, 'login.html')
    return render(request, 'index.html')


def authenticate_user(request):
    email_backend = EmailBackend()
    user = email_backend.authenticate(request, username=request.POST["email"], password=request.POST["password"])
    if user is not None:
        login(request, user)
        return redirect('index')
    return render(request, 'login.html', {"error": "Invalid email or password", "error_class": "invalid"})


def logoutUser(request):
    logout(request)
    return redirect('index')
