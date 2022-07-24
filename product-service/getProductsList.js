"use strict";

import pkg from 'pg';

const { Client } = pkg;

const productListQuery = 'select id, title, description, price, count from products p join stocks s on p.id = s.product_id';

export async function getProductsList(event) {
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
    });

    try {
        await client.connect();
        const { rows } = await client.query(productListQuery);

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: 'Something was wrong',
        };
    } finally {
        client.end()
    }
};
