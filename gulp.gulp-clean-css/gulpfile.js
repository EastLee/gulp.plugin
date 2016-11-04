'use strict';

var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');


//压缩css
gulp.task('minify-css', function() {
    return gulp.src('app/src/*.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({
            compatibility: 'ie8',
            debug: true
        }, function(details) {
            console.info(details);
            // console.log(details.name + ': ' + details.stats.originalSize);
            // console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/dist'));
});
