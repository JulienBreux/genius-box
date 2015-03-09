module.exports = function(grunt) {
    grunt.initConfig({
        'connect': {
            demo: {
                options: {
                    open: true,
                    keepalive: true
                }
            }
        },
        'replace': {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        },
        'gh-pages': {
            options: {
                base: 'demo'
            },
            src: ['**']
        }
    });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('server', ['connect']);
};