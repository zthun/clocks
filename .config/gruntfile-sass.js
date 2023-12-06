var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    options: {
        sourceMap: false,
        sourceMapContents: true,
        outputStyle: 'compact'
    },
    vendor: {
        options: {
            includePaths: fileLists.vendorSass
        },
        files: {
            '<%=paths.dist%>/content/css/ztimer.vendor.min.css': 'src/sass/vendor/ztimer.vendor.scss'
        }
    },
    ztimer: {
        files: {
            '<%=paths.dist%>/content/css/ztimer.min.css': 'src/sass/ztimer/ztimer.scss'
        }
    }
};