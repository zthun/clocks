var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    options: {
        htmlhintrc: 'node_modules/zwebstyles/.htmlhintrc'
    },
    app: {
        src: fileLists.appHtml
    }
};