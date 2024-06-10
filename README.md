
# User Api

The User API offers a comprehensive set of endpoints for managing user information. This API makes it easy to handle user registration, login, deletion, updating, and retrieval of user data.


## Features

- Register User (POST): https://api-user-five.vercel.app/api/users/register

- Login User (POST): https://api-user-five.vercel.app/api/users/login

- Get All Users (GET): https://api-user-five.vercel.app/api/users

- Get User by Id (GET): https://api-user-five.vercel.app/api/users/{id}

- Update User (PATCH): https://api-user-five.vercel.app/api/users/{id}

- Delete User (DELETE): https://api-user-five.vercel.app/api/users/{id}

- Delete Song in User (DELETE): https://hirmify-api.vercel.app/api/{id}

- Like Song in User (PATCH): https://hirmify-api.vercel.app/api/users/{id}


## Authorization

Getting all users, getting a user by Id, updating a user, deleting a user, delete song in a user, and like song in a user require an authorization token provided by the **Login User**. The token must be included in the request headers as follows:

    Authorization: Bearer <token>
## Request Body

Updating and Register a user require a request body in the following format:

    {
            "user_name": STRING,
            "user_password": STRING,
            "user_role": STRING
    }

Login a user require a request body in the following format:

    {
            "user_name": STRING,
            "user_password": STRING,
    }

Delete a song in user require a request body in the following format:

    { 
	        "song_id": STIRNG  
    }

Like a song in user require a request body in the following format:

    {
        "song_id": STRING,
        "song_name": STRING,
        "song_url": STRING,
        "song_image": STRING
    }


## Feedback

If you have any feedback, please reach out to me at reynard.satria@gmail.com


