"use strict";

import pkg from 'pg';
import middy from '@middy/core';
import validator from '@middy/validator';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

const { Client } = pkg;

const productInsertQuery = 'INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id';
const stocksInsertQuery = 'INSERT INTO stocks (product_id, count) VALUES ($1, $2)';

const inputSchema = {
    type: 'object',
    required: ['body'],
    properties: {
        body: {
            type: 'object',
            required: ['title', 'description', 'price', 'count'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                count: { type: 'number' },
            }
        },
    }
};

const handler = async (event) => {
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
        const { rows: [{ id }] } = await client.query(productInsertQuery, [title, description, price]);
        await client.query(stocksInsertQuery, [id, count]);
        await client.query('COMMIT');

        return {
            statusCode: 200,
            body: 'OK',
        };
    } catch (e) {
        await client.query('ROLLBACK');

        return {
            statusCode: 500,
            body: 'Something went wrong',
        };
    } finally {
        await client.end();
    }
};

export const createProduct = middy(handler)
    .use(httpJsonBodyParser())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler())
