// @flow

const Promise = require('bluebird');
const shell = Promise.promisifyAll(require('shelljs')); // this should probably go
const _ = require('lodash');
const BB = require('./buddybuild');
const git = require('./git');
const uuidV4 = require('uuid/v4');
const path = require('path');
const fs = Promise.promisifyAll(require('fs'));
const childProcess = Promise.promisifyAll(require('child_process'));
const onboard = require('./onboarding');
const r = require('request');

const register = (token: string, app: Object) => {
    const client = BB.client(token);

    const nextBuildNumber = () => {
        return client.latestBuild(app._id)
        .then(build => _.get(build, 'build_number', 1));
    };

    const pathToLatestIpa = () => {
        return client.latestBuild(app._id)
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
    };

    const BuddybuildEnvVars = {
        "BUDDYBUILD_BUILD_NUMBER": nextBuildNumber(),
        "BUDDYBUILD_BUILD_ID": uuidV4(),
        "BUDDYBUILD_BRANCH": git.currentBranch(),
        "BUDDYBUILD_WORKSPACE": shell.pwd(),
        "BUDDYBUILD_TRIGGERED_BY": "ui_triggered",
        "BUDDYBUILD_IPA_PATH": pathToLatestIpa(),
        "BUDDYBUILD_APP_STORE_IPA_PATH": pathToLatestIpa(),
        // Not supported for now
        "BUDDYBUILD_BASE_BRANCH": "",
        "BUDDYBUILD_PULL_REQUEST": "",
        "BUDDYBUILD_APP_ID": "",
        "BUDDYBUILD_REPO_SLUG": "",
        "BUDDYBUILD_SECURE_FILES": "",
        "BUDDYBUILD_SCHEME": "",
        "BUDDYBUILD_TEST_DIR": "",
        "BUDDYBUILD_VARIANTS": "",
        "ANDROID_HOME": "",
        "ANDROID_NDK_HOME": ""
    };

    return Promise.resolve(_.keys(BuddybuildEnvVars))
    .map(name => {
        return Promise.all([name, BuddybuildEnvVars[name]]);
    })
    .then(variables => {
        _.forEach(variables, ([name, value]) => {
            process.env[name] = value;
        });
    });
};

const checkScript = (script) => {
    return Promise.resolve(path.resolve(script))
    .then(fullpath => {
        return fs.accessAsync(fullpath, fs.constants.X_OK)
        .then(() => fullpath);
    })
};

module.exports.exec = (scripts: Array<string>) => {
    return onboard()
    .then(([token, app]) => register(token, app))
    .then(() => {
        return Promise.map(scripts, (script) => {
            return checkScript(script)
            .then(fullpath => {
                return childProcess.execFileAsync(fullpath)
                .then(output => console.log(output));
            });
        });
    });
};
