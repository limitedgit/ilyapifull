import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const itemsNum = 9;

export const handler = async(event) => {
    const randNum = String(Math.floor(Math.random() * itemsNum));
    const input = {
        TableName: 'ilyapi',
        KeyConditionExpression: 'id = :hkey',
        ExpressionAttributeValues: {
        ':hkey': {N: randNum},
      }
    };
    const command = new QueryCommand(input);
    
    try {
         const result = await client.send(command);
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        return response;
    } catch (e) {
        const response = {
            statusCode: 500,
            body: JSON.stringify("something went wrong"),
        };
        return response;
    }
};
