/* @flow */

((arguments) => {
    // console.log('arguments');

    require('./lib/main')
        .exec()
        .then(output => console.log(output));
})(process.argv);
