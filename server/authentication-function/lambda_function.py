import json

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
        registerBody = json.loads(event['body'])
        response = buildResponse(200)
    elif event['httpMethod'] == "POST" and event['path'] == loginPath:
        loginBody = json.loads(event['body'])
        response = buildResponse(200)
    elif event['httpMethod'] == "POST" and event['path'] == verifyPath:
        verifyBody = json.loads(event['body'])
        response = buildResponse(200)
    else:
        response = buildResponse(404, "404 Not Found")
    
    return response