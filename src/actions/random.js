var clipboard = require('../clipboard'),
    seeds = {
        default: require('./random/default')
    },
    randomAction;

randomAction = {

    generate: function () {
        return seeds.default.generate();
    },

    run: function () {
        var pwd = this.generate();
        if (clipboard.copy(pwd)) {
            process.stdout.write('A new password has been copied to your clipboard\n');
        } else {
            process.stdout.write('Your random password: ' + pwd + '\n');
        }
    }

};

module.exports = randomAction;