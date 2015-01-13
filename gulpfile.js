var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var base64 = require('gulp-base64');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var deploy = require('gulp-gh-pages');
var browserify = require('gulp-browserify');
var del = require('del');

var paths = {
  'src': {
    js: 'src/**/*.js',
    html: 'src/html/*.html',
    imgs: 'src/imgs/*',
    less: {
      batslap: 'src/less/batslap.less',
      demo: 'src/less/demo.less'
    }
  },
  'dist': 'dist'
};

gulp.task('clean', function (cb) {
  del(paths.dist, cb);
});

gulp.task('js', ['clean'], function () {
  gulp.src(paths.src.js)
    .pipe(browserify({transform: ['brfs']}))
    //.pipe(uglify())
    .pipe(rename('batslap.min.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('html', ['clean'], function () {
  gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('less', ['clean'], function () {
  gulp.src(paths.src.less.batslap)
    .pipe(base64({maxImageSize: 50 * 1024}))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename('batslap.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('demo-less', ['clean'], function () {
  gulp.src(paths.src.less.demo)
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(rename('demo.min.css'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('ghdeploy', function () {
  return gulp.src(
    paths.dist + '/**/*',
    {
      push: true
    }
  )
    .pipe(
      deploy({cacheDir: 'deploy_cache'})
    );
});

gulp.task('build', [
  'clean',
  'js',
  'html',
  'less',
  'demo-less'
]);

gulp.task('default', ['build']);