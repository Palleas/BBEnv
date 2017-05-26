/* @flow */

const Promise = require('bluebird');
const shell = Promise.promisifyAll(require('shelljs'));
const _ = require('lodash');
const BB = require('./buddybuild');
const git = require('./git');
const uuidV4 = require('uuid/v4');

const register = () => {
    const BuddybuildEnvVars = {
        "BUDDYBUILD_BUILD_NUMBER": BB.buildNumber(),
        "BUDDYBUILD_BUILD_ID": uuidV4(),
        "BUDDYBUILD_BRANCH": git.currentBranch(),
        "BUDDYBUILD_WORKSPACE": shell.execAsync('pwd'),
        "BUDDYBUILD_TRIGGERED_BY": "ui_triggered",
        "BUDDYBUILD_IPA_PATH": BB.ipaPath(),
        "BUDDYBUILD_APP_STORE_IPA_PATH": BB.ipaPath(),
        // Not supported for now
        "BUDDYBUILD_BASE_BRANCH": "",
        "BUDDYBUILD_PULL_REQUEST": "",
        // "BUDDYBUILD_APP_ID": "LE BUDDYBUILD_APP_ID",
        // "BUDDYBUILD_REPO_SLUG": "LE BUDDYBUILD_REPO_SLUG",
        // "BUDDYBUILD_SECURE_FILES": "LE BUDDYBUILD_SECURE_FILES",
        // "BUDDYBUILD_SCHEME": "LE BUDDYBUILD_SCHEME",
        // "BUDDYBUILD_TEST_DIR": "LE BUDDYBUILD_TEST_DIR",
        // "BUDDYBUILD_VARIANTS": "LE BUDDYBUILD_VARIANTS",
        // "ANDROID_HOME": "LE ANDROID_HOME",
        // "ANDROID_NDK_HOME": "LE ANDROID_NDK_HOME"
    };

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
