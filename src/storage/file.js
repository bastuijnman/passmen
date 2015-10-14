var fs = require('fs'),
    store,
    read,
    resolve;

/**
 * Stores the given data into a JSON file
 * @protected
 * @param  {Object} data The object you want to store as JSON
 * @return {Promise}     Promise that fulfills when stored and rejects when an error is received
 */
store = function (data) {
    return new Promise(function (fulfill, reject) {
        fs.writeFile('./store.json', JSON.stringify(data), function (err) {
            if (err) {
                return reject(err);
            }
            fulfill();
        });
    });
}

/**
 * Reads the stored JSON file
 * @return {Promise} Promise that fulfills with the parsed JSON object or rejects when an error is received
 */
read = function () {
    return new Promise(function (fulfill, reject) {
        fs.readFile('./store.json', 'utf8', function (err, data) {
            if (err) {

                if (err.errno === -2) {
                    return fulfill({});
                }

                return reject(err);
            }
            fulfill(JSON.parse(data));
        })
    });
}

/**
 * Resolves a key from the data object
 * @param  {string} key  The key you want to retrieve
 * @param  {object} data The data object in which you want to search
 * @return {Promise}     Promise that fulfills with the data when found or rejects when the key is not found
 */
resolve = function (key, data) {
    return new Promise(function (fulfill, reject) {
        if (typeof data[key] !== 'undefined') {
            fulfill(data[key]);
        } else {
            reject();
        }
    });
}

module.exports = {

    /**
     * Gets an item from the storage
     * @param  {string} key The key you want to get from the storage
     * @return {Promise}    Promise that fulfills with the data for this key or rejects when nothing is found
     */
    getItem: function (key) {
        return read().then(function (data){
            return resolve(key, data);
        });
    },

    /**
     * Sets an item in storage
     * @param {string} key  The key under which you want to store data
     * @param {string|boolean|number} data  The data you want to store under the key
     * @return {Promise} Promise that fulfills when storing is successful or rejects when an error occurs
     */
    setItem: function (key, data) {
        return new Promise(function (fulfill, reject) {
            read().then(function (obj) {
                obj[key] = data;
                return obj;
            }).then(function (newObj) {
                store(newObj)
                    .then(fulfill)
                    .catch(reject);
            });
        });
    }
};