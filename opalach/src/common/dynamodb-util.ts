import {
    BatchWriteItemCommandInput,
    BatchWriteItemCommand,
    DynamoDBClient,
    QueryCommand,
    QueryCommandInput,
    ScanCommandInput, ScanCommand
} from '@aws-sdk/client-dynamodb'
import {TransformUtil} from "./transform-util";
const AWS = require('aws-sdk');

export class DynamoDBUtil {
    dynamoDB: DynamoDBClient;

    constructor() {
        if(process.env.local) console.log("\nBootstrapping Local DynamoDB Endpoint\n");
        this.dynamoDB = process.env.local ?
            new DynamoDBClient({
                region: "us-east-1",
                endpoint: process.env.endpoint
            })
            : new DynamoDBClient({
                region: "us-east-1"});
    }

    public async marshallRecords(json: any[]) {
        let dbRecords: any[] = [];
        for(let js of json) {
            dbRecords.push(AWS.DynamoDB.Converter.marshall(js));
        }
        return dbRecords;
    }

    public async unmarshallRecords(dbJson: any[]) {
        let records: any[] = [];
        for(let js of dbJson) {
            records.push(AWS.DynamoDB.Converter.unmarshall(js));
        }
        return records;
    }

    public async scan() {
        const params: ScanCommandInput = {
            TableName: process.env.tableName
        }
        const command = new ScanCommand(params);
        const result = await this.dynamoDB.send(command);
        return result?.Items;
    }

    public async query(pk: string, sk?: string): Promise<any> {
        sk = sk ? sk : "#";
        const params: QueryCommandInput = {
            TableName: process.env.tableName,
            KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
            ExpressionAttributeValues: {
                ':pk': {"S": pk },
                ':sk': {"S": sk }
            }

        };
        //console.log(params);
        const command = new QueryCommand(params);
        const result = await this.dynamoDB.send(command);
        //console.log(result?.Items);
        return result?.Items;
    }

    public async batchWriteItems(records: any[]): Promise<boolean> {
        const batches = Math.ceil(records.length/25);
        console.log("Bulk Batch Writes: " + batches);
        for(let i = 0; i < batches; i++) {
            const putRequests: any[] = [];

            for (let record of records) {
                if(i ===  25) break;

                putRequests.push({
                    PutRequest: {
                        Item: record
                    }
                })
            }

            const tableName = `${process.env.tableName}`;
            const params: BatchWriteItemCommandInput = {
                RequestItems: {}
            }
            params.RequestItems[tableName] = putRequests;
            console.log(JSON.stringify(params, undefined, 2));
            const result = await this.dynamoDB.send(new BatchWriteItemCommand(params));
            if(!TransformUtil.isEmpty(result.UnprocessedItems)) {
                console.log("WARNING: Unprocessed Items.");
                console.log(JSON.stringify(result.UnprocessedItems));
            }
        }
        return true;
    }
}