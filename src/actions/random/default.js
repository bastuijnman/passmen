var cli = require('../../utils/cli'),
    contents = 'abcdefghijklmnopqrstuvw1234567890!@#$%^&*()-=_+';

module.exports = {

    /**
     * Generates a random password
     * @return {string} A new random password
     */
    generate: function () {
        var i = 0,
            pwd = '',
            size = cli.getOption('size', 20);

        for (; i < size; i++) {
            pwd += this.getRandomCharacter();
        }
        return pwd;
    },

    /**
     * Get a random character from the seed string
     * @return {string} A random character
     */
    getRandomCharacter: function () {
        return contents[Math.min(
            Math.round(Math.random() * contents.length),
            contents.length - 1
        )];
    }

};