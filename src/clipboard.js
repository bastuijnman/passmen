var clipboard = {

    /**
     * Copies data to the clipboard
     * @param  {string} data The data you want to write to the clipboard
     * @return {boolean}     True when copied, false if not copied
     */
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