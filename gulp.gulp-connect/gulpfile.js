var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: 'app',//设置根目录
        livereload: true,//启动实施监控
        port: 8888,//设置端口
        name: 'Dev App'//设置服务器名字
    });
});

gulp.task('html', function() {
    gulp.src('./app/**/*.*')
        .pipe(connect.reload());

    // connect.serverClose();
});

gulp.task('watch', function() {
    gulp.watch(['./app/**/*.*'], ['html']);
});

gulp.task('default', ['connect', 'watch']);
