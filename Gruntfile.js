module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    path: {
      bower: 'bower_components',
      src: 'public',
      build: 'dist',
    },
    copy: {
      main: {
        expand: true,
        cwd: '<%= path.src %>/',
        // src: '**',
        src: ['data/**', '!data/story/**', '!**/*.css', '!**/*.coffee'],
        dest: '<%= path.build %>/'
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        expand: true,
        cwd: '<%= path.src %>/',
        src: ['**/*.js', '!**/*.min.js'],
        dest: '<%= path.build %>/',
        ext: '.js'
      },
      build_bower: {
        expand: true,
        cwd: '<%= path.bower %>/',
        src: ['**/*.js', '!**/*.min.js', '!**/jquery/**/*.js'],
        dest: '<%= path.build %>/<%= path.bower %>/',
        ext: '.js'
      }
    },
    coffee: {
      compile: {
        expand: true,
        cwd: '<%= path.src %>/',
        src: ['**/*.coffee'],
        dest: '<%= path.src %>/',
        ext: '.js'
      },
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= path.src %>/',
          src: ['**/*.css', '!**/*.min.css'],
          dest: '<%= path.build %>/',
          ext: '.min.css'
        }]
      }
    },
    wiredep: {
      task: {
        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
        //   'views/**/*.html',   // .html support...
        //   'views/**/*.jade',   // .jade support...
        //   'styles/main.scss',  // .scss & .sass support...
        //   'config.yml'         // and .yml & .yaml support out of the box!
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    },
    forever: {
      texenture: {
        options: {
          index: 'app.js',
          logDir: 'logs'
        }
      },
    },
    watch: {
      coffee: {
        files: '<%= path.src %>/**/*.coffee',
        tasks: ['coffee'],
        options: {
          interrupt: true,
        },
      },
      uglify: {
        files: ['<%= path.src %>/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },
    concurrent: {
      // install node and bower components, compile coffee scripts
      deps: ['npm-install', 'wiredep', 'coffee'],
      // development
      run: ['forever:texenture:start', 'watch:coffee'],
      // production
      run_production: ['forever:texenture:start', 'watch:uglify'],
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-forever');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Default task(s).
  grunt.registerTask('default', ['concurrent:deps', 'forever:texenture:start']);
  grunt.registerTask('production', ['concurrent:deps', 'uglify', 'concurrent:run_production']);
  grunt.registerTask('stop', ['forever:texenture:stop']);
};
