var fs = require('fs'),
    store,
    read,
    resolve;

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

    getItem: function (key) {
        return read().then(function (data){
            return resolve(key, data);
        });
    },

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