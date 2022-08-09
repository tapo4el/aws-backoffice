"use strict";

import ProductService from '../services/productService.js';


const MODULE = 'getProductById -> ';

export async function getProductsById(event) {
    console.log(MODULE, event);

    try {
        const { productId } = event.pathParameters;
        const result = await ProductService.getProductsById(productId);

        if (result) {
            return {
                statusCode: 200,
                body: JSON.stringify(result),
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
    }
};
