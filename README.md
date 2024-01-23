# TXTMAGE

This project aims to be a clone of Chat GPT using the OpenAI API.

## Overview

TXTMAGE is a text-based conversational AI system that utilizes the power of the OpenAI API to generate human-like responses. It is designed to simulate natural language conversations and provide intelligent responses to user inputs.

## Features

- Conversational AI: TXTMAGE leverages the OpenAI API to generate responses that mimic human-like conversations.
- Easy Integration: The project provides a simple and straightforward interface to interact with the conversational AI system.
- Customization: TXTMAGE can be fine-tuned and customized to suit specific use cases and requirements.
- Scalability: The project is designed to handle a large number of concurrent conversations, making it suitable for various applications.

## Getting Started

To get started with TXTMAGE, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/TXTMAGE.git`
2. create an .env file in root directory with the following variables
    ```
        DB_NAME=
        DB_USERNAME
        DB_PASSWORD
        DB_HOSTNAME
        DB_PORT
        SECRET_KEY
        DEBUG
        ALLOWED_HOSTS
        POSTGRES_USER
        POSTGRES_PASSWORD
        POSTGRES_DB
        DJANGO_SETTINGS_MODULE
        OPENAPI_KEY
    ```
3. docker-compose up --build

## Usage

Once the application is running, you can interact with TXTMAGE by sending text inputs through the provided interface. The system will generate responses based on the input and provide them in real-time.

## Contributing

Contributions to TXTMAGE are welcome! If you have any ideas, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- This project is inspired by the Chat GPT model developed by OpenAI.
- Special thanks to the OpenAI team for providing the powerful API that powers TXTMAGE.
