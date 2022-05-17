import json
import boto3
import crypt

from utils.util import build_response


healthPath = "/health"
registerPath = "/register"
loginPath = "/login"
verifyPath = "/verify"

def lambda_handler(event, context):
    # TODO implement
    print("Request Event:", event)
    if event['httpMethod'] == "GET" and event['path'] == healthPath:
        a = crypt.crypt("Hello", "aa")
        response = build_response(200)
    elif event['httpMethod'] == "POST" and event['path'] == registerPath:
        response = build_response(200)
    elif event['httpMethod'] == "POST" and event['path'] == loginPath:
        response = build_response(200)
    elif event['httpMethod'] == "POST" and event['path'] == verifyPath:
        response = build_response(200)
    else:
        response = build_response(404, "404 Not Found")
    
    return response