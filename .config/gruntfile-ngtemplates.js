var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    app: {
        options: {
            module: 'ZTimer',
        },
        src: fileLists.appHtml.concat('!index.html'),
        dest: '<%=paths.temp%>/js/ztimer.templates.js'
    }
};