'use strict';

import ImportService from '../services/importService.js';


const MODULE = 'importFileParser -> ';

export const importFileParser = async (event) => {
    console.log(MODULE, event);

    try {
        await ImportService.parseAndMoveFiles(event.Records);

        return {
            statusCode: 200,
            body: 'Ok',
        }
    } catch (e) {
        console.error(MODULE, e);

        return {
            statusCode: 500,
            body: 'Something went wrong',
        }
    }
};