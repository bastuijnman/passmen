module.exports = {
    generate: function () {
        var crypto = require('crypto'),
            random = crypto.randomBytes(256);

        return random.toString();
    }
};