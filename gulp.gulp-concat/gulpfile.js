var gulp = require('gulp');
var concat = require('gulp-concat');

//删除文件
gulp.task('default', function () {
    return gulp.src(['app/src/*.js','app/lib/*.js'])
        .pipe(concat('all.js',{newLine: '||'}))
        .pipe(gulp.dest('app/dist'))
        //all.js 是合并过后的文件名 newline是一行起始的标志字符串
});
