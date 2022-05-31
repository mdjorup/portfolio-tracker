import json
import os
from pymongo import MongoClient
from response import build_response



db_pw = os.environ.get("DB_PW")
jwt_secret = os.environ.get("JWT_SECRET")

db_client = MongoClient(f"mongodb+srv://admin:{db_pw}@cluster0.bo9qn.mongodb.net/?retryWrites=true&w=majority")




def generate_jwt():
    return

# checks to see if user exists in db
# returns user object with all fields
#if user doesn't exist, return None
def get_user(username):
    return


def register(body):
    name = body.get("name")
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")

    if not name or not username or not email or not password:
        return build_response(400, "Incomplete request body")

    # check if user exists by username

    userinfo = get_user(username)

    if userinfo:
        return build_response(409, "Username already exists")
    
    # add user to db








def login(body):
    return


def verify(token):
    return
