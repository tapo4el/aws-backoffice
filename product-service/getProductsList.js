"use strict";

import productList from "./productList.json" assert { type: 'json' };


export async function getProductsList(event) {
    return {
        statusCode: 200,
        body: JSON.stringify(productList),
    };
};
