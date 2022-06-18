import json
import os
import boto3

# import requests
# for testing dynamo db locally: https://medium.com/@suranjana.basu/test-your-lambda-with-aws-dynamodb-offline-locally-2efc45063fed

from utils.logic import register, login, verify
from utils.response import build_response


healthPath = "/auth/health"
registerPath = "/auth/register"
loginPath = "/auth/login"
verifyPath = "/auth/verify"


def lambda_handler(event, context):

    user_table = boto3.resource("dynamodb", endpoint_url="http://localhost:8000").Table(
        "PortfolioUsers"
    )

    path = event.get("path", "doesn't work")
    method = event.get("httpMethod", "doesn't work")
    body = event.get("body", "")
    if body:
        body = json.loads(body)

    if path == healthPath and method == "GET":
        return build_response(200, {"message": "Healthy"})
    elif path == registerPath and method == "POST":
        # do register logic, get register response
        register_response = register(body)
        return register_response
    elif path == loginPath and method == "POST":
        loginResponse = login(body)
        return loginResponse
    elif path == verifyPath and method == "POST":
        verifyResponse = verify(body.get("jwt", ""))
        return verifyResponse
    else:
        return build_response(400, event)
