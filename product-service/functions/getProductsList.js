"use strict";

import pkg from 'pg';

import { SELECT_PRODUCTS_LIST } from '../db/queries.js';

const { Client } = pkg;
const MODULE = 'getProductsList -> ';

export async function getProductsList(event) {
    console.log(MODULE, event);

    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        const { rows } = await client.query(SELECT_PRODUCTS_LIST);

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (e) {
        console.error(MODULE, e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        };
    } finally {
        client.end()
    }
};
