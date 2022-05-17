import boto3
import os
import asyncio
import crypt

# other functions
from utils.util import build_response


table_name = 'portfolio-users'


# If empty response or response with no username, 
# If response exists, then the user exists
async def getUser(username):

    return


# no response if unable to save user
async def saveUser(user):
    return

# TODO: change bracket access to .get() -> key errors if they do not exist
async def register(userInfo):
    name = userInfo['name']
    email = userInfo['email']
    username = userInfo['username']
    password = userInfo['password']

    if not name or not email or not username or not password:
        return build_response(401, {
            "message": "All fields are required"
        })

    #now check if there exists a user with the username in the dynamo table
    dynamoUser = await getUser(username.lower().strip())

    if dynamoUser and dynamoUser['username']:
        return build_response(401, {
            'message': "User already exists in database"
        })


    # now encrypt the password, define the user object, then send the user object to add to the db
    encyptPW = crypt.crypt(password)
    user = {
        'name': name,
        'email': email,
        'username': username.lower().strip(),
        'password': encyptPW
    }

    saveUserResponse = await saveUser(user)
    if not saveUserResponse:
        return build_response(503, {
            "message": "Server Error. Try again Later"
        })
    
    return build_response(200, {
        "message": "User Registered Successfully",
        "username": username
    })

    # if unable to save user, return 503 response

    # if able to save user, send a 200 response with a success message and username


