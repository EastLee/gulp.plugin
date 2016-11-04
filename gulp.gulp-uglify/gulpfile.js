var gulp = require('gulp');

var uglify = require('gulp-uglify');

gulp.task('compress', function (cb) {

        gulp.src('src/*.js')
        .pipe(uglify())//压缩js
        .pipe(gulp.dest('dist'))

});
