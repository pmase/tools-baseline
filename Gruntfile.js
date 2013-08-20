module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js'],
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // add a real test framework here...
  //grunt.registerTask('test', ['concat', 'mocha']);

  // ...and then add the test task to the default task
  //grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('default', ['jshint']);
};