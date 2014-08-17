module.exports = (grunt) ->

  require("time-grunt") grunt
  require("jit-grunt") grunt

  grunt.initConfig
    watch:
      less:
        files: [
          "templates/**/*.jade"
          "src/**/*"
          "build.js"
        ]
        tasks: ["shell:build"]

    connect:
      server:
        options:
          port: 1881
          hostname: "localhost"
          open: false
          base: "build"

    shell:
      build:
        options:
          async: true

        command: "node build"

  grunt.registerTask "default", [
    "shell:build"
  ]

  grunt.registerTask "dev", [
    "shell:build"
    "connect"
    "watch"
  ]

  return
