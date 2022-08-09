'use strict';

import ProductService from '../services/productService.js';


const MODULE = 'catalogBatchProcess -> ';

export async function catalogBatchProcess(event) {
    console.log(MODULE, event);

    try {

        await ProductService.handleBatchOfProducts(event.Records);

        return {
            statusCode: 200,
            body: 'Ok',
        };
    } catch (e) {
        console.error(e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        };
    }
};