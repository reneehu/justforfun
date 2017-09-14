// requirements
var gulp = require('gulp');
var gulpBrowser = require("gulp-browser");
var reactify = require('reactify');
var del = require('del');
var size = require('gulp-size');
var livereload = require('gulp-livereload');

// tasks
gulp.task('transform', function () {
  var stream = gulp.src('./project/static/scripts/jsx/*.js')
    .pipe(gulpBrowser.browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./project/static/scripts/js/'))
    .pipe(size())
    .pipe(livereload({ start: true }));
  return stream;
});

gulp.task('del', function() {
  console.log('starting fresh');
  return del(['./project/static/scripts/js']);
});

gulp.task('default', ['del'] ,function() {
  console.log('hello from gulp!');
  gulp.start('transform');
  livereload.listen();
  gulp.watch('./project/static/scripts/jsx/*.js', ['transform']);
});