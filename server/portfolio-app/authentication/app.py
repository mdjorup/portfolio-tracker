import json

import pymongo
# import requests
# for testing dynamo db locally: https://medium.com/@suranjana.basu/test-your-lambda-with-aws-dynamodb-offline-locally-2efc45063fed

from utils.response import build_response


healthPath = "/auth/health"
registerPath = "/auth/register"
loginPath = "/auth/login"


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e


    path = event.get("path", "doesn't work")
    method = event.get("httpMethod", "doesn't work")
    body = event.get("body", "")


    if path == healthPath and method == "GET":
        return build_response(200, "Healthy")
    elif path == registerPath and method == "POST":
        #do register logic, get register response
        registerResponse = None
        return registerResponse
    elif path == loginPath and method == "POST":
        loginResponse = None
        return loginResponse
    else:
        return build_response(400, event)

