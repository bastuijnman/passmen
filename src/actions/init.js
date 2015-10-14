var
    /**
     * The inquirer library
     * @private
     * @type {inquirer}
     */
    inquirer = require('inquirer'),

    /**
     * The password manager
     * @private
     * @type {object}
     */
    passwordManager = require('../password'),

    /**
     * The storage interface
     * @private
     * @type {object}
     */
    storage = require('../storage'),

    /**
     * An array with inquirer questions
     * @private
     * @type {Array}
     */
    questions = [
        {
            name: 'name',
            message: 'Please enter your name'
        },
        {
            message: 'Please enter your desired master password',
            name: 'master',
            type: 'password'
        }
    ],
    initAction,
    createInitial,
    initializeDoneMessage;

/**
 * Creates the initial storage with the master password
 * @return {Promise} Promise that fulfills when the master password is stored or rejects when storage has failed
 */
createInitial = function () {
    return new Promise(function (fulfill, reject) {
        inquirer.prompt(questions, function (answers) {
            if (!answers) {
                return reject();
            }
            return storage.setItem('master', passwordManager.createMaster(answers.master));
        })
    });
};

/**
 * Outputs a message that you have already initialized
 */
initializeDoneMessage = function () {
    process.stdout.write('You\'ve already initialized passmen\n');
};

/**
 * The initAction object that contains the methods to run this action
 * @type {Object}
 */
initAction = {

    /**
     * Runs the initAction and asks for the initial master password you want
     * to set or will output a message when you've already initialized
     * @return {Promise} Promise that fulfills when you've already initialized or rejects when a master password is needed
     */
    run: function () {
        return storage.getItem('master')
                .then(initializeDoneMessage, createInitial);
    }

};

module.exports = initAction;