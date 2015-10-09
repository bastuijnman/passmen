var prompt = require('prompt'),
    passwordManager = require('../password'),
    storage = require('../storage'),
    schema = {
        properties: {
            name: {
                required: true,
                message: 'your name'
            },
            master: {
                message: 'your master password',
                hidden: true,
                required: true
            }
        }
    },
    initAction,
    createInitial,
    initializeDoneMessage;

createInitial = function () {
    return new Promise(function (fulfill, reject) {
        prompt.start();
        prompt.get(schema, function (err, result) {
            if (err) {
                return reject(err);
            }
            return storage.setItem('master', passwordManager.createMaster(result.master));
        })
    });
};

initializeDoneMessage = function () {
    process.stdout.write('You\'ve already initialized passmen\n');
};

initAction = {

    run: function () {
        return new Promise(function (fulfill, reject) {
            storage.getItem('master')
                .then(initializeDoneMessage, createInitial);
        });
    }

};

module.exports = initAction;