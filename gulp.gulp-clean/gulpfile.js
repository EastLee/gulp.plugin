var gulp = require('gulp');
var clean = require('gulp-clean');

//删除文件
gulp.task('delFile', function () {
    return gulp.src('app/tmp.js', {read: false})
        .pipe(clean());
});

//删除文件夹
gulp.task('delFolder', function () {
    return gulp.src('app/src', {read: false})
        .pipe(clean());
});

//读取文件的内容，再删除
gulp.task('delRead', function () {
    return gulp.src('app/src/index.js')
        .pipe(clean({force: false}))//强制删除
        .pipe(gulp.dest('app/dist/'));
});
