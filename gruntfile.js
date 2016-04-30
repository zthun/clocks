/*global module, require*/

module.exports = function (grunt) {
    'use strict';
    
    var fileLists = {
        vendorScripts: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
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
        testScripts: [
            'app/**/*.spec.js'
        ],
        appCss: [
            'content/**/*.css'
        ],
        appHtml: [
            'app/**/*.html',
            'index.html'
        ],
        fonts: [
            'node_modules/bootstrap/dist/fonts/*.*'
        ]
    };

    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        // Output paths
        'paths': {
            coverage: 'coverage',
            build: 'dist',
            debug: 'dist/debug',
            release: 'dist/release',
        },
        // Pre Processing 
        'clean': [
            '<%=paths.build%>',
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
                options: {
                    freeze: false,
                    jasmine: true
                },
                files: {
                    src: fileLists.testScripts
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
            files: fileLists.appHtml
        },
        'karma': {
            phantomjs: {
                configFile: 'karma.conf.js'
            }
        },
        // Debug Portion
        'concat': {
            jsScripts: {
                options: { sourceMap: true },
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
        'ngtemplates': {
            app: {
                options: {
                    module: 'ZTimer',
                    append: true,
                    bootstrap: function (module, script) {
                        var scriptTemplate = [
                            '',
                            '(function () { angular.module("{0}").run(ZCacheTemplates);',
                            'ZCacheTemplates.$inject=["$templateCache"];',
                            'function ZCacheTemplates($templateCache) {',
                            '{1}',
                            '}})();',
                            ''
                        ];
                        return scriptTemplate
                            .join('\n')
                            .replace('{0}', module)
                            .replace('{1}', script);
                    }
                },
                src: fileLists.appHtml.concat('!index.html'),
                dest: '<%=concat.jsScripts.dest%>'
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
            }
        },
        'string-replace' : {
            debug: {
                files: {
                    '<%=paths.debug%>/index.html' : '<%=paths.debug%>/index.html'
                },
                options: {
                    replacements: [
                        { pattern: '{VendorJs}', replacement: 'ztimer.vendor.js' },
                        { pattern: '{ScriptsJs}', replacement: 'ztimer.scripts.js' },
                        { pattern: '{VendorCss}', replacement: 'ztimer.vendor.css' },
                        { pattern: '{ContentCss}', replacement: 'ztimer.content.css' }
                    ]
                }
            },
            release: {
                files: {
                    '<%=paths.release%>/index.html' : '<%=paths.release%>/index.html'
                },
                options: {
                    replacements: [
                        { pattern: '{VendorJs}', replacement: 'ztimer.vendor.min.js' },
                        { pattern: '{ScriptsJs}', replacement: 'ztimer.scripts.min.js'},
                        { pattern: '{VendorCss}', replacement: 'ztimer.vendor.min.css' },
                        { pattern: '{ContentCss}', replacement: 'ztimer.content.min.css' }
                    ]
                }
            }
        }
    });
    
    grunt.registerTask('check', [
        'jshint',
        'bootlint',
        'karma'
    ]);
    
    grunt.registerTask('build', [
        'concat',
        'ngtemplates',
        'uglify',
        'cssmin',
        'copy',
        'string-replace'
    ]);
    
    grunt.registerTask('default', [
        'clean',
        'check',
        'build'
    ]);
};