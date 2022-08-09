'use strict';

import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    CopyObjectCommand,
    DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import  { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

import csv from 'csv-parser';


const sqsClient = new SQSClient({ region: 'us-east-1' });
const s3Client = new S3Client({ region: 'us-east-1' });
const BUCKET = 'import-service-storage';

const ImportService = {
    async getSignedUrl(fileName) {
        const bucketParams = {
            Bucket: BUCKET,
            Key: `uploaded/${fileName}`,
        };
        const command = new PutObjectCommand(bucketParams);
        const signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 3600,
        });

        return signedUrl;
    },

    async parseAndMoveFiles(files) {
        const promises = files.map(async ({ s3: { object: { key }}}) => {
            const bucketParams = {
                Bucket: BUCKET,
                Key: `${key}`
            };

            const stream = await s3Client.send(new GetObjectCommand(bucketParams));

            await new Promise((resolve, reject) => {
                stream.Body.pipe(csv())
                    .on('data', this.sendToQueue)
                    .on('error', reject)
                    .on('end', resolve)
            });

            await s3Client.send(new CopyObjectCommand({
                Bucket: BUCKET,
                CopySource: `${BUCKET}/${key}`,
                Key: key.replace('uploaded', 'parsed'),
            }))

            await s3Client.send(new DeleteObjectCommand(bucketParams));
        })

        await Promise.all(promises);
    },

    async sendToQueue(data) {
        try {
            const params = {
                MessageBody: JSON.stringify(data),
                QueueUrl: process.env.SQS_URL
            }

            await sqsClient.send(new SendMessageCommand(params));

        } catch (e) {
            console.log(e);
        }

    }
}
export default ImportService;