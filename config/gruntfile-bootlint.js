var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    options: {
        showallerrors: true,
        relaxerror: {
            'E001': ['src/app/**/*.html'],
            'W001': ['src/app/**/*.html'],
            'W002': ['src/app/**/*.html'],
            'W003': ['src/app/**/*.html'],
            'W004': ['src/app/**/*.html'],
            'W005': ['src/app/**/*.html', 'src/index.html']
        }
    },
    files: fileLists.appHtml
};