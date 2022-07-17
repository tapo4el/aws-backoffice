
import Mocha, { describe, it } from 'mocha';
import { expect } from 'chai';

import { getProductsById } from "../api/getProductsById.js"

describe('Product Service', function () {
    describe('#getProductById()', function () {
        it('should return status 200 and product in body when the product is exist', async function () {
            const event = {
                pathParameters: { productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1" }
            }
            const expectedBody = JSON.stringify({
                "count": 3,
                "description": "Short Product Description7",
                "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
                "price": 15,
                "title": "ProductName"
            });

            const result = await getProductsById(event);

            expect(result.statusCode).to.be.equal(200)
            expect(result.body).to.be.equal(expectedBody)
        });

        it('should return status 404 and "Product not found" message in body when the product does not exist', async function () {
            const event = {
                pathParameters: { productId: "invalidId" }
            }

            const result = await getProductsById(event);

            expect(result.statusCode).to.be.equal(404)
            expect(result.body).to.be.equal("Product not found")
        });
    });
});