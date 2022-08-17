"use strict";

import pkg from 'pg';

import { SELECT_PRODUCT } from './db/queries.js'

const { Client } = pkg;
const MODULE = 'getProductById -> ';

export async function getProductsById(event) {
    console.log(MODULE, event);

    const { productId } = event.pathParameters;
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

        if (rows) {
            return {
                statusCode: 200,
                body: JSON.stringify(rows),
            };
        }

        return {
            statusCode: 404,
            body: "Product not found",
        };
    } catch (e) {
        console.error(MODULE, e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        };
    } finally {
        await client.end();
    }
};
