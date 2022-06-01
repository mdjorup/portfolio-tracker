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

    name = body.get("name")
    username = body.get("username")
    email = body.get("email")
    password = body.get("password").encode()

    if not name or not username or not email or not password:
        return build_response(400, "Incomplete request body")

    # check if user exists by username

    userinfo = get_user_by_username(username)

    if userinfo:
        return build_response(409, "Username already exists")
    
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
        return build_response(500, "Unable to register user")
    

    # generate jwt
    jwt_token = generate_jwt(username)

    return build_response(200, {
        "jwt": jwt_token,
        "message": "Successfully registered user"
    })






def login(body):
    return


def verify(token):
    return
