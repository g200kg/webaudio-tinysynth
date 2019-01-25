module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      dev: {
        files: ['webaudio-tinysynth.js'],
        tasks: ['uglify'],
      }
    },
    uglify: {
      dist: {
        files: {
          'webaudio-tinysynth.min.js': 'webaudio-tinysynth.js',
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.registerTask('default', ['uglify',]);
};
