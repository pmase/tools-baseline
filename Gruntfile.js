module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'features/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // options here to override JSHint defaults
        globals: {
        }
      }
    },
    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
        },
      },
    },
    mocha: {
      all: ['test/*.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha');

  // add a real test framework here
  grunt.registerTask('test', ['mocha']);

  grunt.registerTask('default', ['jshint', 'test']);
};