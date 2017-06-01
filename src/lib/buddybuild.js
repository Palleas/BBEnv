const Promise = require('bluebird');
const fs = require('fs');
const r = require('request');
const rp = require('request-promise-any');
const _ = require('lodash');

module.exports.buildNumber = () => {};
//     return GetLatestBuild()
//     .then(payload => payload['build_number'] + 1);
// };
//
module.exports.ipaPath = () => {};
//     return GetLatestBuild()
//     .then(payload => _.get(payload, 'links.download.0.url'))
//     .then(url => {
//         return new Promise((resolve, reject) => {
//             r(url)
//             .pipe(fs.createWriteStream('app.ipa'))
//             .on('finish', () => {
//                 resolve('app.ipa');
//             });
//         })
//     });
// }

const fetch = (endpoint, token) => {
    return rp.get(`https://api.buddybuild.com/v1/${endpoint}`, {
        'auth': { 'bearer': token }
    })
    .then(response => JSON.parse(response));
};

module.exports.client = (token) => {
    return {
        apps: () => {
            return fetch("apps", token);
        },

        latestBuild: (appId) => {
            return fetch(`apps/${appId}/build/latest`);
        }
    };
};
