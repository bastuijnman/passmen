var implementation = require('./storage/file');

module.exports = {

    /**
     * setItem passes through to the selected storage implementation
     * @param {string} key   The storage key
     * @param {string} value The storage value
     * @return {Promise} A promise that fulfills when the item is set and rejects on error
     */
    setItem: function (key, value) {
        return implementation.setItem(key, value);
    },

    /**
     * getItem passes through to the selected storage implementation
     * @param  {string} key   The storage key
     * @return {Promise} A promise that fulfills when the item is fetched and rejects on error
     */
    getItem: function (key) {
        return implementation.getItem(key);
    },

    /**
     * removeItem passes through to the selected storage implementation
     * @param  {string} key The storage key
     * @return {Promise} A promise that fulfills when the item is removed and rejects on error
     */
    removeItem: function (key) {
        return implementation.removeItem(key, value);
    }

};