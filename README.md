# aws-backoffice

## Task 3

1) Serverless config for Product service created (serverless.yml)
2) getProductsList lambda is deployed and available here - https://vl15lqteoi.execute-api.us-east-1.amazonaws.com/products
3) getProductsById lambda is deployed and available here - https://vl15lqteoi.execute-api.us-east-1.amazonaws.com/products/{productId}
   (for test use "id" from /products endpoint e.g. 7567ec4b-b10c-48c5-9345-fc73c48a80aa)
4) Frontend application is integrated with Product Service (PR - https://github.com/tapo4el/shop-react-redux-cloudfront/pull/2 or can be checked in dev console here https://d3daouilse61ba.cloudfront.net/)
5) Async/await is used in getProductsById lambda function.
6) ES6 modules are used.
7) SWAGGER documentation generated (to check copy swagger.json into https://editor.swagger.io)
8) Lambda handlers are covered by basic UNIT tests (test/getProductsById.spec.js)
9) Lambda handlers (getProductsList, getProductsById) code is separated
10) Main error scenarios are handled by API (run https://vl15lqteoi.execute-api.us-east-1.amazonaws.com/products/invalidId)