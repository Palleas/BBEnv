/* @flow */

const Promise = require('bluebird');
const shell = Promise.promisifyAll(require('shelljs'));
const _ = require('lodash');
const BB = require('./buddybuild');

const BuddybuildEnvVars = {
    "BUDDYBUILD_BUILD_NUMBER": BB.buildNumber(),
    // "BUDDYBUILD_BUILD_ID": "LE BUDDYBUILD_BUILD_ID",
    // "BUDDYBUILD_APP_ID": "LE BUDDYBUILD_APP_ID",
    "BUDDYBUILD_BRANCH": "master",
    // "BUDDYBUILD_BASE_BRANCH": "LE BUDDYBUILD_BASE_BRANCH",
    // "BUDDYBUILD_REPO_SLUG": "LE BUDDYBUILD_REPO_SLUG",
    // "BUDDYBUILD_PULL_REQUEST": "LE BUDDYBUILD_PULL_REQUEST",
    // "BUDDYBUILD_WORKSPACE": "LE BUDDYBUILD_WORKSPACE",
    // "BUDDYBUILD_SECURE_FILES": "LE BUDDYBUILD_SECURE_FILES",
    // "BUDDYBUILD_TRIGGERED_BY": "LE BUDDYBUILD_TRIGGERED_BY",
    // "BUDDYBUILD_IPA_PATH": "LE BUDDYBUILD_IPA_PATH",
    // "BUDDYBUILD_APP_STORE_IPA_PATH": "LE BUDDYBUILD_APP_STORE_IPA_PATH",
    // "BUDDYBUILD_SCHEME": "LE BUDDYBUILD_SCHEME",
    // "BUDDYBUILD_TEST_DIR": "LE BUDDYBUILD_TEST_DIR",
    // "BUDDYBUILD_VARIANTS": "LE BUDDYBUILD_VARIANTS",
    // "ANDROID_HOME": "LE ANDROID_HOME",
    // "ANDROID_NDK_HOME": "LE ANDROID_NDK_HOME"
};

const register = () => {
    return Promise.resolve(_.keys(BuddybuildEnvVars))
    .map(name => {
        return Promise.all([name, BuddybuildEnvVars[name]]);
    })
};

module.exports.exec = () => {
    return register()
    .then(variables => {
        _.forEach(variables, ([name, value]) => {
            process.env[name] = value;
        });

        return shell.execAsync('printenv | grep BUDDYBUILD', {silent: true});
    });
};