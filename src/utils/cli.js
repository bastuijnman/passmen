module.exports = {

    getParsed: function () {
        var args = process.argv,
            length = args.length,
            options = {},
            flags = {},
            arg,
            i,
            split;

        for (i = 0; i < length; i++) {
            arg = args[i];
            if (/--/.test(arg)) {
                arg = arg.replace('--', '');
                split = arg.split('=');
                options[split[0]] = split[1] || true;
            }
        }

        return {
            options: options,
            flags: flags
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
            return false;
        }

        return false;
    }

};