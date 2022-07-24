"use strict";

import pkg from 'pg';

const { Client } = pkg;

const getProductQuery =`select id, title, description, price, count from products p join stocks s on p.id = s.product_id where p.id = $1`

export async function getProductsById(event) {
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
        const { rows } = await client.query(getProductQuery, [productId]);

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
        console.log(e);

        return {
            statusCode: 500,
            body: e, //??
        };
    } finally {
        await client.end();
    }
};
