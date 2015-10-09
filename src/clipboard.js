var clipboard = {

    copy: function (data) {

        var pbcopy;

        if (process.platform === 'darwin') {
            pbcopy = require('child_process').spawn('pbcopy');
            pbcopy.stdin.write(data);
            pbcopy.stdin.end();

            return true;
        }

        return false;

    }

}

module.exports = clipboard;