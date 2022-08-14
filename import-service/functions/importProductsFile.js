'use strict';

import ImportService from '../services/importService.js';
import { corsHeaders } from '../helpers/httpHelpers.js';

const MODULE = 'importProductsFile -> ';

export const importProductsFile = async (event) => {
    console.log(MODULE, event);

    try {
        const { queryStringParameters: { name: fileName } } = event;

        if (!fileName) {
            return {
                statusCode: 400,
                body: 'Bad request'
            }
        }

        const signedUrl = await ImportService.getSignedUrl(decodeURI(fileName));

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: signedUrl
        }

    } catch (e) {
        console.error(MODULE, e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        }
    }
};