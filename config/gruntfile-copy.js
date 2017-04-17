module.exports = {
    bootstrapFonts: {
        expand: true,
        cwd: 'node_modules/bootstrap-sass/assets/fonts/bootstrap',
        src: ['**'],
        dest: '<%=paths.dist%>/content/fonts/'
    },
    index: {
        src: 'src/index.html',
        dest: '<%=paths.dist%>/index.html'
    }
};