var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var less = require('gulp-less');
var del = require('del');
var uglify = require('gulp-uglify');
var jshint = require("gulp-jshint");

gulp.task('default', ['lessWatch']);

// less 打包编译压缩
gulp.task('less-minify', () => {
  gulp.src('./www/less/*.less')
  .pipe(less())
  .pipe(concat('all.css'))
  .pipe(minifyCss())
  // .pipe(rev())
  .pipe(gulp.dest('./www/css'))
  .pipe(rev.manifest())
  .pipe(gulp.dest('./www/less'));
});

gulp.task('deleteCss', () => del(['./www/css/*.css']))
// 监听less 文件改变
gulp.task('lessWatch', () => gulp.watch('./www/less/*.less', ['deleteCss', 'less-minify']));

gulp.task('watch', [
  'watch:lint'
]);
