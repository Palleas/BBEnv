// @flow

const Promise = require('bluebird');
const shell = Promise.promisifyAll(require('shelljs'));

module.exports.currentBranch = (): Promise<string> => {
    return shell.execAsync('git rev-parse --abbrev-ref HEAD', {silent: true});
};
