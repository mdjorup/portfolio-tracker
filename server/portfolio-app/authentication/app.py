import json
import os

# import requests
# for testing dynamo db locally: https://medium.com/@suranjana.basu/test-your-lambda-with-aws-dynamodb-offline-locally-2efc45063fed

from utils.response import build_response


healthPath = "/auth/health"
registerPath = "/auth/register"
loginPath = "/auth/login"
verifyPath = "/auth/verify"


def lambda_handler(event, context):

    path = event.get("path", "doesn't work")
    method = event.get("httpMethod", "doesn't work")
    body = event.get("body", "")


    if path == healthPath and method == "GET":
        return build_response(200, "Healthy")
    elif path == registerPath and method == "POST":
        #do register logic, get register response
        return build_response(200, os.environ.get("DB_PW"))
    elif path == loginPath and method == "POST":
        loginResponse = None
        return loginResponse
    elif path == verifyPath and method == "POST":
        verifyResponse = None
        return verifyResponse
    else:
        return build_response(400, event)

