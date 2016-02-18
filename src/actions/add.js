var
    /**
     * The CLI utility
     * @private
     * @type {object}
     */
    cli = require('../utils/cli'),

    /**
     * The inquirer library
     * @private
     * @type {object}
     */
    inquirer = require('inquirer'),

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
     * An array containing inquirer questions
     * @private
     * @type {Array}
     */
    questions = [
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
        },
        {
            name: 'id',
            type: 'input',
            message: 'please enter an ID for this password'
        },
        {
            name: 'password',
            type: 'password',
            message: 'please enter the password you want to store'
        }
    ],
    addAction;

/**
 * The addAction objects that contains methods to run this action
 * @type {Object}
 */
addAction = {

    /**
     * Stores a password based on the inquirer answers
     * @param {object} params The answers received from inquirer
     * @param {string} params.id The ID for the password to be stored
     * @param {string} params.password The password to store
     * @param {string} params.master The master password given by the user
     * @return {Promise} Promise that fulfills when the encrypted password has been stored or rejects when it's not stored
     */
    store: function (params) {
        var encryption = cli.getOption('encryption', 'aes-256-ctr'),
            id = params.id,
            password = params.password,
            master = params.master,
            encrypted = passwordManager.encryptPassword(password, master, encryption);

        return storage.getItem('items').then(function (items) {
            return items;
        }, function () {
            return [];
        }).then(function (items) {
            items.push({
                id: id,
                password: encrypted,
                encryption: encryption
            });
            return storage.setItem('items', items);
        });
    },

    /**
     * Promts the user for info about the password to store and stores it
     * when all answers are filled
     */
    run: function () {
        var random = cli.getOption('random', false);

        /*
         * If random is flagged we no longer have the need
         * for the password input. We remove it from the
         * questions array
         */
        if (random) {
            questions.forEach(function (item, index) {
                if (item.name === 'password') {
                    questions.splice(index, 1);
                }
            });
        }

        inquirer.prompt(questions, function (answers) {

            // Generate a random password
            if (random) {
                answers.password = require('./random').generate();
            }

            this.store(answers);
        }.bind(this));
    }

};

module.exports = addAction;