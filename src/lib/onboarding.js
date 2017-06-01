// @flow

const readline = require('readline');
const Promise = require('bluebird');
const keychain = Promise.promisifyAll(require('keychain'));
const _ = require('lodash');
const client = require('./buddybuild').client;

const manifest = { account: process.env['USER'], service: 'buddybuild.com' };

const readTokenFromKeychain = () => {
    return new Promise((resolve, reject) => {
        keychain.getPassword(manifest, (err, token) => {
            if (err !== null) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

const askForToken = () => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Please enter your Buddybuild token:', (token) => {
            console.log(token);

            rl.close();

            keychain.setPassword(_.assignIn({}, manifest, {password: token}), (err) => {
                console.log('Stored password', err);
                if (err === null) {
                    resolve(token);
                } else {
                    reject(err);
                }
            });


        });
    })
}

const requestTokenIfNeeded = () => {
    return readTokenFromKeychain()
    .catch(() => {
        return askForToken();
    });
};

const askForApp = (list) => {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("These are your apps: ", list);
        _.forEach(list, (app, index) => {
            console.log(`${index + 1} - ${app['app_name']}`)
        });

        rl.question("Which app is this? ", answer => {
            rl.close();

            resolve(list[_.parseInt(answer) - 1]);
        });
    })
};

module.exports = () => {
    return requestTokenIfNeeded()
    .then(token => {
        return client(token).apps()
        .then(apps => askForApp(apps))
        .then(app => {
            console.log("Selected app " + app["app_name"]);
            return app;
        });
    });
}
