import json


def build_response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Content-Type": "application/json",
            'Access-Control-Allow-Headers': "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": 'OPTIONS,POST,GET'
        },
        "body": json.dumps(body)
    }