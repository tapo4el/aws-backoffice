
import sinon from 'sinon';
import Mocha, { describe, it } from 'mocha';
import { expect } from 'chai';

import ProductService from '../services/productService.js';
import { getProductsById } from '../functions/getProductsById.js';

describe('Product Service', function () {
    describe('#getProductById()', function () {
        it('should return status 200 and product in body when the product is exist', async function () {
            const event = {
                pathParameters: { productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1" }
            }
            const expectedResult = { test: true }
            const stub = sinon.stub(ProductService, 'getProductsById').resolves(expectedResult);

            expect(await getProductsById(event)).to.deep.equal({
                statusCode: 200,
                body: JSON.stringify(expectedResult),
            })

            stub.restore();
        });

        it('should return status 404 and "Product not found" message in body when the product does not exist', async function () {
            const event = {
                pathParameters: { productId: "invalidId" }
            }
            const stub = sinon.stub(ProductService, 'getProductsById').resolves();

            expect(await getProductsById(event)).to.deep.equal({
                statusCode: 404,
                body: 'Product not found',
            })

            stub.restore();
        });
    });
});