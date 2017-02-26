/*global module, require*/

module.exports = function (grunt) {
    'use strict';
    
    var gruntConfig = require('./gruntfile-config.json');
    var fileLists = gruntConfig.fileLists;
    var dbg = grunt.option('--dbg');

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        // Output paths
        paths: gruntConfig.paths,
        
        // Cleanup 
        clean: {
            build: '<%=paths.build%>',
            coverage: '<%=paths.coverage%>',
            temp: '<%=paths.temp%>',
            dist: '<%=paths.dist%>'
        },
        
        // Checks
        jshint: {
            options: {
                jshintrc: 'node_modules/zwebstyles/.jshintrc'
            },
            self: {
                files: {
                    src: ['gruntfile.js']
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
        },
        bootlint: {
            options: {
                showallerrors: true,
                relaxerror: {
                    'E001': ['app/**/*.html'],
                    'W001': ['app/**/*.html'],
                    'W002': ['app/**/*.html'],
                    'W003': ['app/**/*.html'],
                    'W004': ['app/**/*.html'],
                    'W005': ['app/**/*.html', 'index.html']
                }
            },
            files: fileLists.appHtml
        },
        htmlhint: {
            options: {
                htmlhintrc: 'node_modules/zwebstyles/.htmlhintrc'
            },
            app: {
                src: fileLists.appHtml
            }
        },
        sasslint: {
            options: {
                configFile: 'node_modules/zwebstyles/.sasslint.yml',
            },
            target: ['sass/**/*.scss']
        },
        karma: {
            phantomjs: {
                configFile: 'karma.conf.js'
            }
        },
        
        // Build
        ngtemplates: {
            app: {
                options: {
                    module: 'ZTimer',
                },
                src: fileLists.appHtml.concat('!index.html'),
                dest: '<%=paths.temp%>/js/ztimer.templates.js'
            }
        },
        uglify: {
            options: {
                sourceMap: dbg,
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
        },
        sass: {
            options: {
                sourceMap: dbg,
                sourceMapContents: true,
                outputStyle: 'compact'
            },
            vendor: {
                options: {
                    includePaths: fileLists.vendorSass
                },
                files: {
                    '<%=paths.dist%>/content/css/ztimer.vendor.min.css': 'sass/vendor/ztimer.vendor.scss'
                }
            },
            ztimer: {
                files: {
                    '<%=paths.dist%>/content/css/ztimer.min.css': 'sass/ztimer/ztimer.scss'
                }
            }
        },
        copy: {
            bootstrapFonts: {
                expand: true,
                cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
                src: ['**'],
                dest: '<%=paths.dist%>/content/fonts/'
            },
            index: {
                src: 'index.html',
                dest: '<%=paths.dist%>/index.html'
            }
        }
    });
    
    grunt.registerTask('check', [
        'jshint',
        'bootlint',
        'htmlhint',
        'sasslint',
        'karma'
    ]);
    
    grunt.registerTask('build', [
        'sass',
        'ngtemplates',
        'uglify',
        'copy'
    ]);
    
    grunt.registerTask('default', [
        'clean',
        'check',
        'build',
        'clean:temp'
    ]);
};