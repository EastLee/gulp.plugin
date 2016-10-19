var gulp = require('gulp');
var minify = require('gulp-minify');


gulp.task('default', function () {
    gulp.src('app/src/*.js')
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
            //src和min 一个压缩了 一个未压缩
        },
        exclude: ['tasks'],//未成功
        ignoreFiles: ['.combo.js', '-min.js']//未尝试成功
    }))
    .pipe(gulp.dest('app/dist'))
});
