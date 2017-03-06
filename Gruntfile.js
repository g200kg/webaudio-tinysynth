module.exports = function(grunt) {

  grunt.initConfig({

    watch: {
      dev: {
        files: ["src/*"],
        tasks: ["replace","include_file","uglify",],
      }
    },
    replace: {
      nogui:{
        src:["src/webaudio-tinysynth-coreobj.js"],
        dest:"tmp/webaudio-tinysynth-nogui.js",
        replacements:[{
          from:/@@gui([\s\S]*?)@@guiEND/g,
          to:"",
        }]
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
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.registerTask('default', ['include_file','uglify',]);
};
