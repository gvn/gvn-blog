module.exports = (grunt) ->

  require("time-grunt") grunt
  require("jit-grunt") grunt

  grunt.initConfig
    watch:
      less:
        files: [
          "templates/**/*.jade"
          "src/**/*.md"
        ]
        tasks: ["shell:build"]

    connect:
      server:
        options:
          port: 1881
          hostname: "localhost"
          open: true
          base: "build"

    shell:
      build:
        options:
          async: true

        command: "node_modules/.bin/metalsmith"

  grunt.registerTask "default", ["shell:build"]

  grunt.registerTask "dev", [
    "shell:build"
    "connect"
    "watch"
  ]

  return
