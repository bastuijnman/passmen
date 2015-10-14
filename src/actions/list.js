var
    /**
     * The inquirer library
     * @private
     * @type {object}
     */
    inquirer = require('inquirer'),

    /**
     * The clipboard interface
     * @private
     * @type {object}
     */
    clipboard = require('../clipboard'),

    /**
     * The storage interface
     * @private
     * @type {object}
     */
    storage = require('../storage'),

    /**
     * The password manager
     * @private
     * @type {object}
     */
    passwordManager = require('../password'),

    /**
     * An array containing all inquirer questions
     * @private
     * @type {Array}
     */
    questions = [
        {
            name: 'item',
            type: 'list',
            message: 'select the password you want to check',
            choices: function () {
                var done = this.async();
                storage.getItem('items').then(function (items) {
                    done(items.map(function (item) {
                        return item.id;
                    }));
                }, function () {
                    process.stdout.write('You don\'t have any passwords stored yet');
                    done([]);
                });
            }
        },
        {
            name: 'master',
            type: 'password',
            message: 'please enter your master password',
            validate: function (input) {
                var done = this.async();
                passwordManager.verifyMaster(input).then(function (verified) {
                    if (!verified) {
                        done('The master password is not correct');
                    }
                    done(true);
                })
            }
        }
    ],
    listAction;

/**
 * The listAction object containing the methods for running the
 * action
 * @type {Object}
 */
listAction = {

    /**
     * Decrypts a password based on the master password provided
     * @param {object} params The params received from inquirer questions
     * @param {string} params.item The item you want to decrypt
     * @param {string} params.master The master password
     */
    decrypt: function (params) {
        storage.getItem('items').then(function (items) {
            var item = items.filter(function (item) {
                    return item.id === params.item
                })[0],
                decrypted = passwordManager.decryptPassword(item.password, params.master),
                message;

            if (decrypted) {
                if (!clipboard.copy(decrypted)) {
                    message = 'Your password: ' + decrypted ;
                } else {
                    message = 'Your password has been copied to your clipboard';
                }
            } else {
                message = 'Failed to decrypt the password';
            }
            process.stdout.write(message + '\n');
        });
    },

    /**
     * Runs the list action, asks questions through inquirer and tries
     * to decrypt the password when all questions are answered
     */
    run: function () {
        inquirer.prompt(questions, this.decrypt.bind(this));
    }

};

module.exports = listAction;