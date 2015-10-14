var crypto = require('crypto'),
    storage = require('./storage'),
    passwordManager;

passwordManager = {

    /**
     * creates a hashed master password
     * @param  {string} masterPassword The password you want to hash
     * @return {string} The hashed password
     */
    createMaster: function (masterPassword) {
        return crypto.createHash('sha512')
                        .update(masterPassword)
                        .digest('hex');
    },

    /**
     * Verifies the master password
     * @param  {string} masterPassword The master password you want to verify
     * @return {Promise} A promise that fulfills with a boolean indicating the verification or rejects on error
     */
    verifyMaster: function (masterPassword) {
        var hashed = crypto.createHash('sha512')
                        .update(masterPassword)
                        .digest('hex');

        return storage.getItem('master').then(function (master) {
            return hashed === master;
        });
    },

    /**
     * Encrypt a password
     * @param  {string} password The password to encrypt
     * @param  {string} master   The master password to use as cipher key
     * @return {string} The encrypted password
     */
    encryptPassword: function (password, master) {
        var cipher = crypto.createCipher('aes192', master);
        cipher.update(password, 'utf8');
        return cipher.final('hex');
    },

    /**
     * Decrypts a password
     * @param  {string} password The password to decrypt
     * @param  {string} master   The master password that was used as cipher key
     * @return {string|boolean} The decrypted password or false when a failure has occured
     */
    decryptPassword: function (password, master) {
        var decipher = crypto.createDecipher('aes192', master);
        decipher.update(password, 'hex');
        try {
            return decipher.final('utf8');
        } catch (e) {
            return false;
        }
    }

};

module.exports = passwordManager;