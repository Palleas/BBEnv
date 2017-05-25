/* @flow */

((launchArgs) => {
    require('./lib/main')
        .exec()
        .then(output => console.log(output));
})(process.argv);
