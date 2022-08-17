
// import { mockClient } from 'aws-sdk-client-mock';
import sinon from 'sinon';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';

import ImportService from '../services/importService.js';

import { importProductsFile } from '../functions/importProductsFile.js';

describe('Import Service', function () {

    it('should return status 200 and url in body if file name provided', async function () {
        const expectedUrl = 'https://test.com';
        const stub = sinon.stub(ImportService, 'getSignedUrl').resolves(expectedUrl);
        const event = {
            queryStringParameters: { name: 'test.csv' }
        };

        expect(await importProductsFile(event)).to.deep.equal({
            statusCode: 200,
            body: expectedUrl,
        })

        stub.restore();
    })

    it('should return status 400 if file name not provided', async function () {
        const event = {
            queryStringParameters: {}
        };

        expect(await importProductsFile(event)).to.deep.equal({
            statusCode: 400,
            body: 'Bad request',
        });
    })

    it('should return status 500 if some internal server error', async function () {
        const stub = sinon.stub(ImportService, 'getSignedUrl').throws();
        const event = {
            queryStringParameters: { name: 'test.csv' }
        };

        expect(await importProductsFile(event)).to.deep.equal({
            statusCode: 500,
            body: 'Something went wrong',
        });

        stub.restore();
    })
})