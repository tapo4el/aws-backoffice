"use strict";

import productList from "./productList.json" assert { type: 'json' };


const emulateCallToDB = (productId) => new Promise((resolve) => {
    setTimeout(() => resolve(productList.find(product => product.id === productId)), 50)
})

export async function getProductsById(event) {
    const { productId } = event.pathParameters;
    const product = await emulateCallToDB(productId);

    if (product) {
        return {
            statusCode: 200,
            body: JSON.stringify(product),
        };
    }

    return {
        statusCode: 404,
        body: "Product not found",
    };
};
