import json
import boto3
import crypt
# https://docs.aws.amazon.com/lambda/latest/dg/python-package.html
# https://pypi.org/project/boto3/
# 4. Once figured out how to deploy, test the functions using postman (might be valuable to deploy functions from command line)
# 5. Implement the functions in this directory

from utils.util import *


healthPath = "/health"
registerPath = "/register"
loginPath = "/login"
verifyPath = "/verify"

def lambda_handler(event, context):
    # TODO implement
    print("Request Event:", event)
    if event['httpMethod'] == "GET" and event['path'] == healthPath:
        a = crypt.crypt("Hello", "aa")
        response = buildResponse(200)
    elif event['httpMethod'] == "POST" and event['path'] == registerPath:
        response = buildResponse(200)
    elif event['httpMethod'] == "POST" and event['path'] == loginPath:
        response = buildResponse(200)
    elif event['httpMethod'] == "POST" and event['path'] == verifyPath:
        response = buildResponse(200)
    else:
        response = buildResponse(404, "404 Not Found")
    
    return response