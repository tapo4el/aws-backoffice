"use strict";

export const INSERT_PRODUCT = 'INSERT INTO products (title, description, price) VALUES ($1, $2, $3) RETURNING id';
export const INSERT_STOCK = 'INSERT INTO stocks (product_id, count) VALUES ($1, $2)';
export const SELECT_PRODUCT = 'select id, title, description, price, count from products p join stocks s on p.id = s.product_id where p.id = $1'
export const SELECT_PRODUCTS_LIST = 'select id, title, description, price, count from products p join stocks s on p.id = s.product_id';