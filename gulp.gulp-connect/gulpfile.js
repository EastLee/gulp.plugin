var gulp = require('gulp');
var connect = require('gulp-connect');
var Rest = require('connect-rest');



var options = {
    context: '/',
    logger: {
        file: 'mochaTest.log',
        level: 'debug'
    },
    // apiKeys: [ '849b7648-14b8-4154-9ef2-8d1dc4c2b7e9' ],
}
var rest = Rest.create(options);

gulp.task('connect', function() {
    connect.server({
        root: 'app', //设置根目录
        livereload: true, //启动实施监控
        port: 8888, //设置端口
        name: 'Dev App', //设置服务器名字
        // host:'m.58.com',
        middleware: function(connect, opt) {
            return [rest.processRequest()]
        }
    });
    rest.get('foo', function(req) {
        console.info(req.url);
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
