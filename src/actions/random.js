var
    /**
     * The clipboard interface
     * @private
     * @type {object}
     */
    clipboard = require('../clipboard'),

    /**
     * All of the available seed methods
     * @private
     * @type {object}
     */
    seeds = {
        default: require('./random/default')
    },
    randomAction;

/**
 * The randomAction object containing methods to run the
 * random action
 * @type {Object}
 */
randomAction = {

    /**
     * Generates a random password based on the selected seed
     * @return {string} The newly generated password
     */
    generate: function () {
        return seeds.default.generate();
    },

    /**
     * Runs the random action and copies the password to the clipboard
     * or outputs it to the screen when copying is not supported
     */
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