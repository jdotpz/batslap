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
  demo: 'demo'
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
    'img'
    'fonts-demo'
    'fonts-batslap'
    'less-batslap'
    'less-demo'
    'coffee'
    'minify-js'
    'base64'
    'client'
    'cleanup'
    cb
  )

# lint check and convert coffee
gulp.task 'coffee', ->
  return gulp.src "#{dirs.dev}/coffee/**/*coffee"
  .pipe coffeelint()
  .pipe coffeelint.reporter 'fail'
  .pipe coffee()
  .pipe browserify { transform:['brfs'] }
  .pipe rename 'batslap.js'
  .pipe gulp.dest "#{dirs.dist}"

gulp.task 'minify-js', ->
  return gulp.src "#{dirs.dist}/batslap.js"
  .pipe uglify()
  .pipe rename 'batslap.min.js'
  .pipe gulp.dest "#{dirs.dist}"

gulp.task 'img', ->
  return gulp.src "#{dirs.dev}/img/*.jpg"
  .pipe gulp.dest "#{dirs.dist}"

# convert less to css and move to dist/client/*.css
gulp.task 'less-batslap', ->
  return gulp.src "#{dirs.dev}/#{dirs.less}/batslap.less"
  .pipe less()
  .pipe rename 'batslap.css'
  .pipe gulp.dest "#{dirs.dist}"

gulp.task 'less-demo', ->
  return gulp.src "#{dirs.dev}/#{dirs.less}/demo.less"
  .pipe less()
  .pipe minifyCSS()
  .pipe rename 'demo.min.css'
  .pipe gulp.dest "#{dirs.dist}/#{dirs.demo}"

gulp.task 'base64', ->
  return gulp.src "#{dirs.dist}/*.css"
  .pipe base64
    maxImageSize: 50*1024
  .pipe gulp.dest "#{dirs.dist}"

# copy client files to dist/client
gulp.task 'client', ->
  return gulp.src [
    "#{dirs.dev}/#{dirs.html}/*.html"
  ]
  .pipe gulp.dest "#{dirs.dist}/#{dirs.demo}"

gulp.task 'fonts-demo', ->
  return gulp.src [
    "#{dirs.dev}/fonts/**/*.ttf"
  ]
  .pipe gulp.dest "#{dirs.dist}/#{dirs.demo}/fonts"

gulp.task 'fonts-batslap', ->
  return gulp.src [
    "#{dirs.dev}/fonts/**/*.otf"
  ]
  .pipe gulp.dest "#{dirs.dist}/fonts"

gulp.task 'cleandist', (cb)->
  del ['dist/*', 'dist/.*','!dist/.git*','!dist/node_modules'], cb

gulp.task 'cleanup', ->
  del [
    "#{dirs.dist}/*.jpg"
    "#{dirs.dist}/fonts"
    "#{dirs.dist}/batslap.min.css"
    "#{dirs.dist}/batslap.css"
  ]

# deploy front-end to gh-pages
gulp.task 'ghdeploy', ->
  return gulp.src "#{dirs.dist}/**/*", { push:true }
  .pipe deploy cacheDir: 'deploy_cache'