var gruntConfig = require('./gruntfile-config');
var fileLists = gruntConfig.fileLists;

module.exports = {
    options: {
        jshintrc: 'node_modules/zwebstyles/.jshintrc'
    },
    self: {
        files: {
            src: ['gruntfile.js', 'config/**/*.js']
        }
    },
    main: {
        files: {
            src: fileLists.appScripts
        }
    },
    test: {
        files: {
            src: fileLists.testScripts
        }
    }
};