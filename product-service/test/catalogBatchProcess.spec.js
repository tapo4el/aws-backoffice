
import sinon from 'sinon';
import { describe, it } from 'mocha';
import { expect } from 'chai';

import ProductService from '../services/productService.js';
import { catalogBatchProcess } from '../functions/catalogBatchProcess.js';


describe('Product Service', function () {
    describe('#catalogBatchProcess()', function () {
        it('should return status 200 if batch was processed correctly', async function () {
            const stub = sinon.stub(ProductService, 'handleBatchOfProducts').resolves();
            const event = { Records: [] };

            expect(await catalogBatchProcess(event)).to.deep.equal({
                statusCode: 200,
                body: 'Ok',
            })

            stub.restore();
        });

        it('should return status 500 if some internal server error', async function () {
            const stub = sinon.stub(ProductService, 'handleBatchOfProducts').throws();
            const event = { Records: [] };

            expect(await catalogBatchProcess(event)).to.deep.equal({
                statusCode: 500,
                body: 'Something went wrong',
            });

            stub.restore();
        });
    });
});