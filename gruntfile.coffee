module.exports = (grunt) ->

  require("time-grunt") grunt
  require("jit-grunt") grunt

  grunt.initConfig
    watch:
      less:
        files: [
          "templates/**/*.jade"
          "src/posts/**/*.md"
          "metalsmith.json"
        ]
        tasks: ["shell:build"]
      assets:
        files: [
          "src/css/**/*.css"
        ]
        tasks: ["copy"]

    connect:
      server:
        options:
          port: 1881
          hostname: "localhost"
          open: false
          base: "build"

    copy:
      css:
        expand: true
        cwd: 'src/css/'
        src: '**'
        dest: 'build/_assets/css/'

    shell:
      build:
        options:
          async: true

        command: "node_modules/.bin/metalsmith"

  grunt.registerTask "default", ["shell:build", "copy"]

  grunt.registerTask "dev", [
    "shell:build"
    "connect"
    "watch"
  ]

  return
