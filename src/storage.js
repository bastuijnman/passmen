var implementation = require('./storage/file');

module.exports = {

    setItem: function (key, value) {
        return implementation.setItem(key, value);
    },

    getItem: function (key, value) {
        return implementation.getItem(key, value);
    },

    removeItem: function (key) {
        return implementation.removeItem(key, value);
    }

};