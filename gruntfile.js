/*global module*/

module.exports = function (grunt) {
    'use strict';

    var filePaths = {
        coverage: 'coverage',
        build: 'bin',
        debug: 'bin/debug',
        release: 'bin/release',
        full: 'bin/full'
    };
    
    var fileLists = {
        vendorScripts: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/zpubsub/bin/zpubsub.js',
            'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        vendorCss: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/animate.css/animate.css'
        ],
        appScripts: [
            'app/ztimer.js',
            'app/**/*.js',
            '!app/**/*.spec.js'
        ],
        appCss: [
            'content/**/*.css'
        ],
        appHtml: [
            'app/**/*.html'
        ],
        fonts: [
            'node_modules/bootstrap/dist/fonts/*.*'
        ]
    };
    
    function pathMap(location, relativePath) {
        var isNot = relativePath.length > 0 && relativePath[0] === '!';
        var path = isNot ? relativePath.slice(1) : relativePath;
        var first = isNot ? '!' : '';
        
        return '{0}{1}/{2}'
            .replace('{0}', first)
            .replace('{1}', location)
            .replace('{2}', path);
    }
    
    function fullPathMap(relativePath) {
        return pathMap(filePaths.full, relativePath);
    }
    
    grunt.file.readJSON('package.json');

    grunt.initConfig({
        // Configuration
        'paths': filePaths,
        // Pre Processing 
        'clean': [
            '<%=paths.build %>',
            '<%=paths.coverage%>'
        ],

        // Checks
        'jshint': {
            options: {
                curly: true,
                eqeqeq: true,
                forin: true,
                funcscope: true,
                freeze: true,
                futurehostile: true,
                nonbsp: true,
                nonew: true,
                notypeof: true,
                unused: true,
                undef: true
            },
            main: {
                files: {
                    src: [
                        'app/**/*.js',
                        '!app/**/*.spec.js',
                        'gruntfile.js'
                    ]
                }
            },
            test: {
                options: {
                    freeze: false,
                    jasmine: true
                },
                files: {
                    src: [
                        'app/**/*.spec.js'
                    ]
                }
            }
        },
        'bootlint': {
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
            files: [
                'app/**/*.html',
                'index.html'
            ]
        },
        'karma': {
            phantomjs: {
                configFile: 'karma.conf.js'
            }
        },
        // Debug Portion
        'concat': {
            jsScripts: {
                src: fileLists.appScripts,
                dest: '<%=paths.debug%>/scripts/ztimer.scripts.js'
            },
            jsVendor: {
                src: fileLists.vendorScripts,
                dest: '<%=paths.debug%>/scripts/ztimer.vendor.js'
            },
            cssContent: {
                src: fileLists.appCss,
                dest: '<%=paths.debug%>/content/css/ztimer.content.css'
            },
            cssVendor: {
                src: fileLists.vendorCss,
                dest: '<%=paths.debug%>/content/css/ztimer.vendor.css'
            }
        },
        // Release Portion
        'uglify': {
            scripts: {
                files: {
                    '<%=paths.release%>/scripts/ztimer.scripts.min.js' : [
                        '<%=paths.debug%>/scripts/ztimer.scripts.js'
                    ]
                }
            },
            vendor: {
                files: {
                    '<%=paths.release%>/scripts/ztimer.vendor.min.js' : [
                        '<%=paths.debug%>/scripts/ztimer.vendor.js'    
                    ]
                }
            }
        },
        'cssmin': {
            content: {
                files: {
                    '<%=paths.release%>/content/css/ztimer.content.min.css' : [
                        '<%=paths.debug%>/content/css/ztimer.content.css'
                    ]
                }
            },
            vendor: {
                files: {
                    '<%=paths.release%>/content/css/ztimer.vendor.min.css' : [
                        '<%=paths.debug%>/content/css/ztimer.vendor.css'
                    ]
                }
            }
        },
        // Post Processing
        'copy': {
            // Debug Files
            debugTemplates: {
                expand: true,
                src: fileLists.appHtml,
                filter: 'isFile',
                dest: '<%=paths.debug%>/'
            },
            debugFonts: {
                expand: true,
                flatten: true,
                src: fileLists.fonts,
                filter: 'isFile',
                dest: '<%=paths.debug%>/content/fonts/'
            },
            debugIndex: {
                src: 'index.html',
                dest: '<%=paths.debug%>/index.html'
            },
            // Release Files
            releaseTemplates: {
                expand: true,
                cwd: '<%=paths.debug%>',
                src: fileLists.appHtml,
                filter: 'isFile',
                dest: '<%=paths.release%>/'
            },
            releaseFonts: {
                expand: true,
                flatten: true,
                src: fileLists.fonts,
                filter: 'isFile',
                dest: '<%=paths.release%>/content/fonts/'
            },
            releaseIndex: {
                src: 'index.html',
                dest: '<%=paths.release%>/index.html'
            },
            // Full Files
            fullScripts:  {
                expand: true,
                src: fileLists.appScripts,
                filter: 'isFile',
                dest: '<%=paths.full%>/'
            },
            fullCss: {
                expand: true, 
                src: fileLists.appCss, 
                filter: 'isFile',
                dest: '<%=paths.full%>/'
            },
            fullTemplates: {
                expand: true,
                src: fileLists.appHtml,
                filter: 'isFile',
                dest: '<%=paths.full%>/'
            },
            fullVendor: {
                expand: true, 
                src: fileLists.vendorScripts,
                dest: '<%=paths.full%>/'
            },
            fullVendorCss: {
                expand: true, 
                src: fileLists.vendorCss,
                dest: '<%=paths.full%>/'
            },
            fullFonts: {
                expand: true,
                src: fileLists.fonts, 
                dest: '<%=paths.full%>/'
            },
            fullIndex: {
                src: 'index.full.html',
                dest: '<%=paths.full%>/index.html'
            }
        },
        'string-replace' : {
            debug: {
                files: {
                    '<%=paths.debug%>/index.html' : '<%=paths.debug%>/index.html'
                },
                options: {
                    replacements: [{
                            pattern: '{VendorJs}',
                            replacement: 'ztimer.vendor.js'
                        },{
                            pattern: '{ScriptsJs}',
                            replacement: 'ztimer.scripts.js'
                        },{
                            pattern: '{VendorCss}',
                            replacement: 'ztimer.vendor.css'
                        },{
                            pattern: '{ContentCss}',
                            replacement: 'ztimer.content.css'
                        },{
                            pattern: '{SpritesCss}',
                            replacement: 'ztimer.sprites.css'
                        }
                    ]
                }
            },
            release: {
                files: {
                    '<%=paths.release%>/index.html' : '<%=paths.release%>/index.html'
                },
                options: {
                    replacements: [{
                            pattern: '{VendorJs}',
                            replacement: 'ztimer.vendor.min.js'
                        },{
                            pattern: '{ScriptsJs}',
                            replacement: 'ztimer.scripts.min.js'
                        },{
                            pattern: '{VendorCss}',
                            replacement: 'ztimer.vendor.min.css'
                        },{
                            pattern: '{ContentCss}',
                            replacement: 'ztimer.content.min.css'
                        },{
                            pattern: '{SpritesCss}',
                            replacement: 'ztimer.sprites.min.css'
                        }
                    ]
                }
            }
        },
        'tags' : {
            options: {
                scriptTemplate: '<script src="{{ path }}"></script>',
                linkTemplate: '<link rel="stylesheet" href="{{ path }}" />',
            },
            fullvendorcss: {
                options: {
                    openTag: '<!--start vendor css-->',
                    closeTag: '<!--end vendor css-->'
                },
                src: fileLists.vendorCss.map(fullPathMap),
                dest: '<%=paths.full%>/index.html'
            },
            fullcss: {
                options: {
                    openTag: '<!--start app css-->',
                    closeTag: '<!--end app css-->'
                },
                src: fileLists.appCss.map(fullPathMap),
                dest: '<%=paths.full%>/index.html'
            },
            fullVendorScripts: {
                options: {
                    openTag: '<!--start vendor scripts-->',
                    closeTag: '<!--end vendor scripts-->',
                },
                src: fileLists.vendorScripts.map(fullPathMap),
                dest: '<%=paths.full%>/index.html'
            },
            
            fullScripts: {
                options: {
                    openTag: '<!--start app scripts-->',
                    closeTag: '<!--end app scripts-->',
                },
                src: fileLists.appScripts.map(fullPathMap),
                dest: '<%=paths.full%>/index.html',
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bootlint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-script-link-tags');
    
    grunt.registerTask('check', [
        'jshint',
        'bootlint',
        'karma'
    ]);
    
    grunt.registerTask('rebuild', [
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'string-replace',
        'tags'
    ]);
    
    grunt.registerTask('default', [
        'clean',
        'check',
        'rebuild'
    ]);
};