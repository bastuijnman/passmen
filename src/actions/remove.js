'use strict';

let
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
                return passwordManager.verifyMaster(input).then(function (verified) {
                    if (!verified) {
                        return 'The master password is not correct';
                    }
                    return true;
                })
            }
        },
        {
            name: 'item',
            type: 'list',
            message: 'select the password you want to remove',
            choices: function () {
                return storage.getItem('items').then(function (items) {
                    return items.map(function (item) {
                        return item.id;
                    });
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

        return Promise
            .all([
                inquirer.prompt(questions),
                storage.getItem('items')
            ])
            .then(results => {
                let answers = results[0],
                    items = results[1];

                // Remove the item identical to the users answer
                items.forEach((item, index) => {
                    if (item.id === answers.item) {
                        items.splice(index, 1);
                    }
                });

                // Store the resulting items array
                return storage.setItem('items', items);
            })
            .catch(err => {
                process.stdout.write(err);
                process.exit(0);
            });
    }

};

module.exports = removeAction;