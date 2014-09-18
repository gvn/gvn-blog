var gulp = require('gulp'),
  connect = require('gulp-connect'),
  exec = require('child_process').exec;

gulp.task('watch', function () {
  var watcher = gulp.watch([
    'templates/**/*.jade',
    'src/**/*',
    'build.js'
  ], ['build']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 1881
  });
});

gulp.task('build', function () {
  exec('node build');
});


gulp.task('default', ['build', 'connect', 'watch']);
