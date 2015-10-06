var cmd = process.argv[2] || 'list',
    actions = {
        init: require('./actions/init'),
        list: require('./actions/list')
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