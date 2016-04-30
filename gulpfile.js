var gulp = require('gulp'),
nodemon = require('gulp-nodemon');
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

gulp.task("babel", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('default', function(){
  nodemon({
    script:'src/app.js',
    tasks: ['babel'],
    ext: 'js',
    env: {
      PORT:8000
    },
    ignore: ['../node_modules/**']
  })
  .on('restart', function(){
    console.log('Restarting Services...\n');
  });
});
