/* @flow */

const Promise = require('bluebird');

module.exports.buildNumber = () => {
    return new Promise((resolve, reject) => {
        resolve(54)
    })
    .delay(1000);
    // return Promise.resolve()
    // // .tap(() => { console.log("Pausing 1 second"); })
    // .delay(1000)
    // // .then(() => 54);
};
