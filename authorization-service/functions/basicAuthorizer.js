'use strict';


const MODULE = 'basicAuthorizer -> ';

const generatePolicy = (principalId, resource, effect) => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource
                }
            ]
        }
    };
}

export const basicAuthorizer = async (event, ctx, cb) => {
    console.log(MODULE, event);

    if (event.type !== 'TOKEN') {
        cb('Unauthorized');
    }

    try {
        const authorizationToken = event.authorizationToken;
        const encodedCredentials = authorizationToken.split(' ')[1];
        const [username, password] = atob(encodedCredentials).split(':');

        console.log(`Received ${username} and ${password}`);

        const storedPassword = process.env[username];
        console.log(`Stored ${storedPassword}`);
        const effect = !storedPassword || storedPassword !== password ? 'Deny' : 'Allow';

        const policy = generatePolicy(encodedCredentials, event.methodArn, effect);

        cb(null, policy);

    } catch (e) {
        console.error(MODULE, e);

        cb(`Unauthorized: ${e.message}`);
    }
};