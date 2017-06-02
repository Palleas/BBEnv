// @flow

const Promise = require('bluebird');
const fs = require('fs');
const r = require('request');
const rp = require('request-promise-any');
const _ = require('lodash');

const fetch = (endpoint: string, token: string) => {
    return rp.get(`https://api.buddybuild.com/v1/${endpoint}`, {
        'auth': { 'bearer': token },
    })
    .then(response => JSON.parse(response));
};

module.exports.client = (token: string) => {
    return {
        apps: () => {
            return fetch("apps", token);
        },

        latestBuild: (appId: string) => {
            return fetch(`apps/${appId}/build/latest`, token);
        }
    };
};
