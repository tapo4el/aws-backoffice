"use strict";

import middy from '@middy/core';
import validator from '@middy/validator';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';

import { inputSchema } from '../validators/createProduct.js'
import ProductService from '../services/productService.js';

const MODULE = 'createProduct -> ';

const handler = async (event) => {
    console.log(MODULE, event);

    try {

        await ProductService.createProduct(event);

        return {
            statusCode: 200,
            body: 'OK',
        };
    } catch (e) {
        console.error(MODULE, e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        };
    }
};

export const createProduct = middy(handler)
    .use(httpJsonBodyParser())
    .use(validator({ inputSchema }))
    .use(httpErrorHandler())
