module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      test_steps_js: {
        src: [
          'features/dictionary.js',
          'features/library.js',
          'features/steps/**/*.js'
        ],
        dest: 'test/steps.js'
      },
      test_features: {
        src: ['features/**/*.feature'],
        dest: 'test/features.feature'
      },
      test_mocha_js: {
        src: ['node_modules/mocha/mocha.js'],
        dest: 'test/lib/mocha.js',
      },
      test_chai_js: {
        src: ['node_modules/chai/chai.js'],
        dest: 'test/lib/chai.js',
      },
      test_d3_js: {
        src: ['node_modules/d3/d3.js'],
        dest: 'test/lib/d3.js',
      },
      test_mocha_css: {
        src: ['node_modules/mocha/mocha.css'],
        dest: 'test/lib/mocha.css',
      },
      test_yadda: {
        src: ['node_modules/yadda/dist/yadda-0.4.5.js'],
        dest: 'test/lib/yadda.js',
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'features/**/*.js', 'lib/**/*.js']
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
      runner: {
        src: ['test/runner.html'],
        
        options: {
          // Pipe output console.log from your JS to grunt. False by default.
          log: true,
          
          // Override the timeout of the test (default is 5000)
          timeout: 10000,
          
          
          // Select a Mocha reporter
          // http://visionmedia.github.com/mocha/#reporters
          reporter: 'Nyan'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');

  // add a real test framework here
  grunt.registerTask('test', ['concat', 'mocha']);

  grunt.registerTask('default', ['jshint', 'test']);
};