var cmd = process.argv[2] || 'list',
    actions = {
        init: require('./actions/init'),
        list: require('./actions/list'),
        random: require('./actions/random'),
        add: require('./actions/add')
    },
    action = actions[cmd];

module.exports = {

    resolve: function () {
        if (typeof action !== 'undefined') {
            action.run();
        }
    },

    init: function () {
        actions.init.run();
    }
}