module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      options: {
        node: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      files: ['GruntFile.js', 'app/**/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};