var gulp = require('gulp');
const del = require('del');

var args = process.argv.slice(2);
console.info(args);

function test(){
    console.info('test!');
}

test();

gulp.task('default', function() {
    test();
});

//删除文件
gulp.task('delFile', function() {
    del(['tmp/*.js', '!tmp/a.js'],{dryRun: false}).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});//dryRun:true 删除功能失效
