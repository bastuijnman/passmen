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
            name: 'item',
            type: 'list',
            message: 'select the password you want to remove',
            choices: function () {
                var done = this.async();
                storage.getItem('items').then(function (items) {
                    done(items.map(function (item) {
                        return item.id;
                    }));
                }, function () {
                    process.stdout.write('You don\'t have any passwords stored yet');
                    process.exit(0);
                });
            }
        }
    ],
    removeAction;

/**
 * The removeAction objects that contains methods to run this action
 * @type {Object}
 */
removeAction = {

    run: function () {
        inquirer.prompt(questions, function (answers) {
            storage.getItem('items').then(function (items) {
                return items;
            }, function () {
                return [];
            }).then(function (items) {
                items.forEach(function (item, index) {
                    if (item.id === answers.item) {
                        items.splice(index, 1);
                    }
                });
                return storage.setItem('items', items);
            });
        });
    }

};

module.exports = removeAction;