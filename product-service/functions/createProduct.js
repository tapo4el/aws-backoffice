"use strict";

import pkg from 'pg';
import middy from '@middy/core';
import validator from '@middy/validator';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

import { inputSchema } from '../validators/createProduct.js'
import { INSERT_PRODUCT, INSERT_STOCK } from '../db/queries.js';

const { Client } = pkg;
const MODULE = 'createProduct -> ';

const handler = async (event) => {
    console.log(MODULE, event);

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

        return {
            statusCode: 200,
            body: 'OK',
        };
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(MODULE, e);

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
