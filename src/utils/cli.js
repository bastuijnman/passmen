module.exports = {

    getParsed: function () {
        var args = process.argv,
            length = args.length,
            commandArgs = [],
            options = {},
            arg,
            i,
            split;

        for (i = 0; i < length; i++) {
            arg = args[i];
            if (/--/.test(arg)) {
                arg = arg.replace('--', '');
                split = arg.split('=');
                options[split[0]] = split[1] || true;
            } else if (i > 2) { // Don't push default command args
                commandArgs.push(arg);
            }
        }

        return {
            args: commandArgs,
            options: options
        };

    },

    getOption: function (name, defaultValue) {
        var parsed = this.getParsed(),
            options = parsed.options,
            option = options[name];

        if (typeof option !== 'undefined') {
            return option;
        }

        if (typeof defaultValue !== 'undefined') {
            return defaultValue;
        }

        return false;
    },

    help: function (module) {
        module = module || 'help';
        process.stdout.write(require('../help/' + module));
        process.exit(0);
    }

};