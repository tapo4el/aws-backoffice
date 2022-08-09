'use strict';

import pkg from 'pg';
import  { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

import { INSERT_PRODUCT, INSERT_STOCK, SELECT_PRODUCT } from '../db/queries.js';

const { Client } = pkg;
const snsClient = new SNSClient({ region: 'us-east-1' });


const ProductService = {
    async createProduct(event) {
        const { body: { title, description, price, count } } = event;
        const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });

        try {
            await client.connect();
            await client.query('BEGIN');
            const { rows: [{ id }] } = await client.query(INSERT_PRODUCT, [title, description, price]);
            await client.query(INSERT_STOCK, [id, count]);
            await client.query('COMMIT');


        } catch (e) {
            await client.query('ROLLBACK');

            throw Error(e);
        } finally {
            await client.end();
        }
    },

    async handleBatchOfProducts(events) {
        const promises = events.map(async (record) => {
            const data = JSON.parse(record.body);
            await ProductService.createProduct({ body: data });

            const params = {
                Subject: 'New product added',
                Message: record.body,
                TopicArn: process.env.SNS_ARN,
                MessageAttributes: {
                    count: {
                        DataType: 'Number',
                        StringValue: `${data.count}`
                    }
                }
            };

            await snsClient.send(new PublishCommand(params));
        });

        await Promise.all(promises);
    },

    async getProductsById(productId) {
        const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT,
        });

        try {
            await client.connect();
            const { rows } = await client.query(SELECT_PRODUCT, [productId]);

            return rows;
        } catch (e) {
            throw Error(e);
        } finally {
            await client.end();
        }
    }
};
export default ProductService;