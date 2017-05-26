/* @flow */

const Promise = require('bluebird');
const request = require('request-promise-any');

module.exports.buildNumber = () => {
    return request.get('https://api.buddybuild.com/v1/apps/58dd451676c52a0001cbfd14/build/latest', {
        'auth': {
            'bearer': process.env['BB_API_KEY']
        }
    })
    .then(response => JSON.parse(response))
    .then(payload => payload['build_number'] + 1)
};
