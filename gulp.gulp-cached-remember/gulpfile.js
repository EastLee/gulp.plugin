var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cache = require('gulp-cached'),
    remember = require('gulp-remember');

var scriptsGlob = 'src/**/*.js';

gulp.task('scripts', function() {
    return gulp.src(scriptsGlob)
        .pipe(cache('scripts'))//只会处理有改动的文件
        .pipe(remember('scripts'))//合并cache没有处理的文件
        .pipe(concat('app.js'))
        .pipe(gulp.dest('public/'))
});

gulp.task('default', function() {
    gulp.watch(scriptsGlob, ['scripts']);
})
