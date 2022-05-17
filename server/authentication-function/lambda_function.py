import json
import requests
import boto3
# https://docs.aws.amazon.com/lambda/latest/dg/python-package.html
# https://pypi.org/project/boto3/
# 1. reset folder - create virtual environment instead
# 2. make sure virtual environment works - install boto3 as well
# 3. Follow the steps to create the zip folder - also figure out the flags
# 4. Once figured out how to deploy, test the functions using postman (might be valuable to deploy functions from command line)
# 5. Implement the functions in this directory



healthPath = "/health"
registerPath = "/register"
loginPath = "/login"
verifyPath = "/verify"

def buildResponse(statusCode, body=""):
    return {
        "statusCode": statusCode,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        "body": json.dumps(body)
    }

def lambda_handler(event, context):
    # TODO implement
    print("Request Event:", event)
    if event['httpMethod'] == "GET" and event['path'] == healthPath:
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