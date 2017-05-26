/* @flow */

const Promise = require('bluebird');
const fs = require('fs');
const r = require('request');
const rp = require('request-promise-any');
const _ = require('lodash');

const GetLatestBuild = () => {
    return rp.get('https://api.buddybuild.com/v1/apps/58dd451676c52a0001cbfd14/build/latest', {
        'auth': {
            'bearer': process.env['BB_API_KEY']
        }
    })
    .then(response => JSON.parse(response))
};

module.exports.buildNumber = () => {
    return GetLatestBuild()
    .then(payload => payload['build_number'] + 1);
};

module.exports.ipaPath = () => {
    return GetLatestBuild()
    .then(payload => _.get(payload, 'links.download.0.url'))
    .then(url => {
        return new Promise((resolve, reject) => {
            r(url)
            .pipe(fs.createWriteStream('app.ipa'))
            .on('finish', () => {
                resolve('app.ipa');
            });
        })
    });
}
