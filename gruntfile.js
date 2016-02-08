/*global module, inject*/

module.exports = function (grunt) {
    'use strict';
    
    grunt.file.readJSON('package.json');

    grunt.initConfig({
        // Configuration
        'paths': {
            coverage: 'coverage',
            build: 'bin',
            debug: 'bin/debug',
            release: 'bin/release'        
        },
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
                        '!app/**/*.spec.js'
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
        'karma': {
            phantomjs: {
                configFile: 'karma.conf.js'
            }
        },
        // Debug Portion
        'sprite': {
            debug: {
                src: ['content/images/icon-site/*.png', 'content/images/icon-games/*.png'],
                dest: '<%=paths.debug%>/content/ztimer.sprites.png',
                destCss: '<%=paths.debug%>/styles/ztimer.sprites.css',
                padding: 0,
            },
        },
        'concat': {
            jsScripts: {
                src: [
                    'app/ztimer.js',
                    'app/**/*.js',
                    '!app/**/*.spec.js'
                ],
                dest: '<%=paths.debug%>/scripts/ztimer.scripts.js'
            },
            jsVendor: {
                src: [
                    'node_modules/angular/angular.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.js'
                ],
                dest: '<%=paths.debug%>/scripts/ztimer.vendor.js'
            },
            cssContent: {
                src: [
                    'content/**/*.css'
                ],
                dest: '<%=paths.debug%>/styles/ztimer.content.css'
            },
            cssVendor: {
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.css',
                    'node_modules/animate.css/animate.css'
                ],
                dest: '<%=paths.debug%>/styles/ztimer.vendor.css'
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
                    '<%=paths.release%>/styles/ztimer.content.min.css' : [
                        '<%=paths.debug%>/styles/ztimer.content.css'
                    ]
                }
            },
            sprites: {
                files: {
                    '<%=paths.release%>/styles/ztimer.sprites.min.css' : [
                        '<%=paths.debug%>/styles/ztimer.sprites.css']
                }
            },
            vendor: {
                files: {
                    '<%=paths.release%>/styles/ztimer.vendor.min.css' : [
                        '<%=paths.debug%>/styles/ztimer.vendor.css'
                    ]
                }
            }
        },
        // Post Processing
        'copy': {
            debug: {
                expand: true,
                src: [
                    'app/**/*.html'
                ],
                filter: 'isFile',
                dest: '<%=paths.debug%>/'
            },
            debugIndex: {
                src: 'index.html',
                dest: '<%=paths.debug%>/index.html'
            },
            release: {
                expand: true,
                cwd: '<%=paths.debug%>',
                src: [
                    'app/**/*.html',
                    'content/*.png'
                ],
                filter: 'isFile',
                dest: '<%=paths.release%>/'
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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    
    grunt.registerTask('check', [
        'jshint',
        'karma'
    ]);
    
    grunt.registerTask('rebuild', [
        'sprite',
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'string-replace'
    ]);
    
    grunt.registerTask('default', [
        'clean',
        'check',
        'rebuild'
    ]);
};