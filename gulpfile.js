'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jadeLang = require('jade'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    gutil = require('gutil'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps');

var outputDir = 'builds/development',
    env = process.env.NODE_ENV || 'development';

gulp.task('jade', function() {
  var j = jade({
    jade: jadeLang,
    pretty: true
  });
  j.on('error', function(e){
    gutil.log(e);
    j.end();
  });

  return gulp.src('src/templates/**/*.jade')
    .pipe(j)
    .pipe(gulp.dest(outputDir))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src('src/i/*.*')
        .pipe(gulp.dest(outputDir+'/i'));
});

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
        .pipe(gulp.dest(outputDir+'/js'))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    var files = [
      './src/js/**/*.js',
      //'!./src/js/modules/signalr.js' - sample NOT
    ];
    files.push('./gulpfile.js');
    return gulp.src(files)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function() {
  var config = {};

  if (env === 'production') {
    config.outputStyle = 'compressed';
  }

  if (env === 'development') {
      config.onError = function(e) { console.log(e); };
      config.sourceMap = 'sass';
      //config.sourceComments = 'map';
  }

  return gulp.src('src/sass/main.scss')
    .pipe(sass(config))
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    port: 8002,
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/templates/**/*.jade', ['jade']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/js/**/*.js', ['js', 'lint']);
});

gulp.task('default', ['jade', 'images', 'sass', 'watch', 'connect', 'js', 'lint']);
