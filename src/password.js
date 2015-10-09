var crypto = require('crypto'),
    storage = require('./storage'),
    passwordManager;

passwordManager = {

    createMaster: function (masterPassword) {
        return crypto.createHash('sha512')
                        .update(masterPassword)
                        .digest('hex');
    },

    verifyMaster: function (masterPassword) {
        var hashed = crypto.createHash('sha512')
                        .update(masterPassword)
                        .digest('hex');

        return storage.getItem('master').then(function (master) {
            return hashed === master;
        });
    }

};

module.exports = passwordManager;