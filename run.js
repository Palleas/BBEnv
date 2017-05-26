/* @flow */

const _ = require('lodash');

((launchArgs) => {
    if (launchArgs.length < 3) {
        console.log("usage: bbenv buddybuild_script.sh");
        process.exit(2); // TODO: is this the proper exit code? We'll never know!
    }

    const script = _.nth(launchArgs, 2);

    require('./lib/main')
    .exec(script)
    .then(output => console.log(output));
})(process.argv);
