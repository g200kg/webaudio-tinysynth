module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      dev: {
        files: ["src/*"],
        tasks: ["include_file","uglify",],
      }
    },
    include_file: {
      your_target: {
        cwd:"src/",
        src:["webaudio-tinysynth.html","webaudio-tinysynth.js"],
        dest:"./",
      },
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
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-include-file');
  grunt.registerTask('default', ['include_file','uglify',]);
};
