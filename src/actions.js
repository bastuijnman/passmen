var actions = {
        init: require('./actions/init'),
        list: require('./actions/list'),
        random: require('./actions/random'),
        add: require('./actions/add'),
        remove: require('./actions/remove')
    };

module.exports = {

    /**
     * Resolves an action based on the given key
     * @param  {string} key The key of the action you want to run
     * @return {boolean}    True when resolved, false otherwise
     */
    resolve: function (key) {
        var action = actions[key];
        if (typeof action !== 'undefined') {
            action.run();
            return true;
        }
        return false;
    },

    /**
     * Runs the init action
     */
    init: function () {
        actions.init.run();
    }
}