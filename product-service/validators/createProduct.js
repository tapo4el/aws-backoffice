"use strict";

export const inputSchema = {
    type: 'object',
    required: ['body'],
    properties: {
        body: {
            type: 'object',
            required: ['title', 'description', 'price', 'count'],
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                count: { type: 'number' },
            }
        },
    }
};