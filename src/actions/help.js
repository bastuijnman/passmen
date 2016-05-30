var
    /**
     * The CLI utility
     * @private
     * @type {object}
     */
    cli = require('../utils/cli'),
    helpAction;

/**
 * The helpAction objects that contains methods to run this action
 * @type {Object}
 */
helpAction = {

    /**
     * Outputs the generic help
     */
    run: function () {
        var options = cli.getParsed(),
            command = options.args[0],
            actions = require('../actions');

        if (command && actions.resolveWithoutRunning(command)) {
            cli.help(command);
        } else {
            cli.help();
        }
    }

};

module.exports = helpAction;