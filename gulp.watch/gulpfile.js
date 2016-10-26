var gulp = require('gulp');

//第一种方式

// gulp.task('uu',function(){
//     console.info('uu');
// });

// var watcher = gulp.watch('./js/*.js', ['uu']);

// gulp.task('default',function(){
//     console.info('开启监听！');
//     watcher.on('change', function(event) {
//         console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
//     });
// })


//第二种方式
gulp.task('default',function(){
    console.info('开启监听！');
    gulp.watch(['./js/*.js','./css/*.css'],function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    })
})
