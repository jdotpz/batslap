require 'coffee-script/register'

fs = require 'fs'
gulp = require 'gulp'
path = require 'path'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
less = require 'gulp-less'
uglify = require 'gulp-uglify'
base64 = require 'gulp-base64'
minifyCSS = require 'gulp-minify-css'
rename = require 'gulp-rename'
deploy = require 'gulp-gh-pages'
browserify = require 'gulp-browserify'
del = require 'del'
runSequence = require 'run-sequence'
pkg = require './package.json'

dirs =
  client: ''
  coffee: 'coffee'
  dev: 'src'
  dist: 'dist'
  html: 'html'
  img: 'img'
  less: 'less'
  misc: 'misc'

gulp.task 'default', ['build']

gulp.task 'clean_build', (cb)->
  runSequence(
    'cleandist'
    'build'
    cb
  )

gulp.task 'build', (cb)->
  runSequence(
    'coffee'
    'img'
    'less'
    'client'
    'fonts'
    cb
  )

# lint check and convert coffee
gulp.task 'coffee', ->
  gulp.src "#{dirs.dev}/coffee/**/*coffee"
  .pipe coffeelint()
  .pipe coffeelint.reporter 'fail'
  .pipe coffee()
  .pipe browserify()
  .pipe uglify()
  .pipe rename pkg.main
  .pipe gulp.dest ""

gulp.task 'img', ->
  return gulp.src "#{dirs.dev}/img/**/*.jpg"
  .pipe gulp.dest "#{dirs.dist}/#{dirs.client}/img"

# convert less to css and move to dist/client/*.css
gulp.task 'less', ->
  return gulp.src "#{dirs.dev}/#{dirs.less}/*.less"
  .pipe less()
  .pipe base64
    extensions: ['otf']
  .pipe minifyCSS()
  .pipe rename pkg.name + '.min.css'
  .pipe gulp.dest "#{dirs.dist}/#{dirs.client}"

# copy client files to dist/client
gulp.task 'client', ->
  return gulp.src [
    "#{dirs.dev}/#{dirs.html}/*.html"
  ]
  .pipe gulp.dest "#{dirs.dist}/#{dirs.client}"

gulp.task 'fonts', ->
  return gulp.src [
    "#{dirs.dev}/fonts/**/*.ttf"
    "#{dirs.dev}/fonts/**/*.otf"
  ]
  .pipe gulp.dest "#{dirs.dist}/fonts"

gulp.task 'cleandist', (cb)->
  del ['dist/*', 'dist/.*','!dist/.git*','!dist/node_modules'], cb

# deploy front-end to gh-pages
gulp.task 'ghdeploy', ->
  return gulp.src "#{dirs.dist}/#{dirs.client}", { push:true }
  .pipe deploy cacheDir: 'deploy_cache'