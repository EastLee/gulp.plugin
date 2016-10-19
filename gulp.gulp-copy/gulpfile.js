var gulp = require('gulp');
var copy = require('gulp-copy');

//复制文件
gulp.task('copy', function () {
    gulp.src('app/src/index.js')
        .pipe(copy('app/dist/',{prefix:2}))
        //prefix 复制的文件夹层级 2代表去掉两层文件夹，如果是0，复制后是dist/app/dist/index.js
});
