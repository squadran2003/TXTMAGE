from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from decouple import config, Csv
from openai import OpenAI
client = OpenAI(
    api_key=config("OPENAPI_KEY"),
)


class ChatList(APIView):

    def post(self, request, format=None):
        chat = [
            {"role": "system", "content": "You are a helpful assistant."}
        ]
        chat.append({"role": "user", "content": request.data["message"]})
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=chat,
        )
        return Response(completion.choices[0].message, status=status.HTTP_201_CREATED)


def index(request):
    return render(request, 'index.html')
