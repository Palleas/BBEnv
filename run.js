#!/usr/bin/env node
// @flow

const _ = require('lodash');

((launchArgs) => {
    if (launchArgs.length < 3) {
        console.log("usage: bbenv steps...");
        process.exit(2); // TODO: is this the proper exit code? We'll never know!
    }

    const steps = _.slice(launchArgs, 2);

    require('./lib/main').exec(steps)
})(process.argv);
