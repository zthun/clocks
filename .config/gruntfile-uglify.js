var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    options: {
        sourceMap: false,
        sourceMapIncludeSources: true
    },
    scripts: {
        src: fileLists.appScripts,
        dest: '<%=paths.dist%>/scripts/ztimer.min.js'
    },
    vendor: {
        src: fileLists.vendorScripts,
        dest: '<%=paths.dist%>/scripts/ztimer.vendor.min.js'
    }
};