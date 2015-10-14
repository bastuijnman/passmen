module.exports = {

    /**
     * Generates a random password
     * @return {string} A new random password
     */
    generate: function () {
        var crypto = require('crypto'),
            random = crypto.randomBytes(256);

        return random.toString();
    }
};