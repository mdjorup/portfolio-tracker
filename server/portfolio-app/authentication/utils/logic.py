import os
import bcrypt
import jwt
import datetime
from pymongo import MongoClient
from utils.response import build_response



db_pw = os.environ.get("DB_PW")
jwt_secret = os.environ.get("JWT_SECRET")

db_client = MongoClient(f"mongodb+srv://admin:{db_pw}@cluster0.bo9qn.mongodb.net/?retryWrites=true&w=majority")
db = db_client["portfolio-app-main-db"]
users_collection = db["Users"]



def generate_jwt(username):
    payload = {
        "username": username,
        "exp": datetime.datetime.now() + datetime.timedelta(days=4)
    }
    token = jwt.encode(payload, jwt_secret)
    return token

# checks to see if user exists in db
# returns user object with all fields
#if user doesn't exist, return None
def get_user_by_username(username):

    doc_username = users_collection.find_one({"username": username})
    if doc_username:
        return doc_username
    return None


def register(body):

    name = body.get("name", "")
    username = body.get("username", "")
    email = body.get("email", "")
    password = body.get("password", "").encode()

    if not name or not username or not email or not password:
        return build_response(400, {
            "error": "IncompleteRequestError",
            "message": "Incomplete request. Please Fill in all fields"
        })

    # check if user exists by username

    userinfo = get_user_by_username(username)

    if userinfo:
        return build_response(409, {
            "error": "UserExistsError",
            "message": "User with given username already exists"
        })
    
    # add user to db

    encrypted_pw = bcrypt.hashpw(password, bcrypt.gensalt())

    user = {
        "name": name,
        "username": username,
        "email": email,
        "password": encrypted_pw
    }

    try:
        users_collection.insert_one(user)
    except:
        return build_response(500, {
            "error": "ServerError",
            "message": "Unable to register user to DB"
        })
    

    # generate jwt
    jwt_token = generate_jwt(username)

    return build_response(200, {
        "jwt": jwt_token,
        "message": "Successfully registered user"
    })


def login(body):

    username = body.get("username", "")
    password = body.get("password", "").encode()

    if not username or not password:
        return build_response(400, {
            "error": "IncompleteRequestError",
            "message": "Incomplete request. Please Fill in all fields"
        })
    
    userinfo = get_user_by_username(username)

    if not userinfo:
        return build_response(400, {
            "error": "UserNotFoundError",
            "message": "User not found. Please check username or Register as a new user."
        })
    
    encrypted_pw = userinfo.get("password")

    if not bcrypt.checkpw(password, encrypted_pw):
        return build_response(400, {
            "error": "Unauthorized",
            "message": "Incorrect password"
        })
    
    jwt_token = generate_jwt(username)

    return build_response(200, {
        "jwt": jwt_token,
        "message": "Successfully Logged In"
    })


def verify(token):

    try:
        jwt.decode(token, jwt_secret, algorithms=['HS256'])
        return build_response(200, {
            "status": "Success",
            "message": "Valid JWT"
        })
    except jwt.exceptions.ExpiredSignatureError as ese:
        return build_response(401, {
            "error": "ExpiredSignatureError",
            "message": "Token Expired. Log In Again"
        })
    except jwt.exceptions.InvalidTokenError as ite:
        return build_response(401, {
            "error": "InvalidTokenError",
            "message": "Invalid Token. Log In Again"
        })
