module.exports = {
    paths: {
        build: 'build',
        reports: 'build/reports',
        coverage: 'build/coverage',
        dist: 'build/dist',
        temp: 'build/temp'
    },

    fileLists: {
        vendorScripts: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/zpubsub/dist/zpubsub.all.js',
            'node_modules/bootstrap-sass/assets/javascripts/bootstrap.js'
        ],
        vendorSass: [
            'node_modules/bootstrap-sass/assets/stylesheets',
            'node_modules/animate-sass'
        ],
        appScripts: [
            'src/app/ztimer.js',
            'src/app/**/*.js',
            '!src/app/**/*.spec.js',
            '<%=paths.temp%>/**/*.js'
        ],
        testScripts: [
            'src/app/**/*.spec.js'
        ],
        testFrameworkScripts: [
            'node_modules/angular-mocks/angular-mocks.js'
        ],
        appSass: [
            'src/sass'
        ],
        appHtml: [
            'src/app/**/*.html',
            'src/index.html'
        ]
    }
};
