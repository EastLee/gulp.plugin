var named = require('vinyl-named');
var fs = require('vinyl-fs');

fs.src('src/*.js')
    .pipe(named(function(file) {
        console.info(file.named);//file.named为undefined
    })).pipe(fs.dest('./dist'))

fs.src('src/*.js')
    .pipe(named())
    .pipe(named(function(file) {
        console.info(file.named);//file.named为文件名字 index和main
    })).pipe(fs.dest('./dist'))


    fs.src('src/*.js')
        .pipe(named(function(file){
            return 'hehe'
        }))
        .pipe(named(function(file) {
            console.info(file.named);//file.named为文件名字 hehe和hehe
        })).pipe(fs.dest('./dist'))


        fs.src('src/*.js')
            .pipe(named(function(file){
                file.customName = 'yourname';
                this.queue(file);
            }))
            .pipe(named(function(file) {
                console.info(file.customName);//定义一个customName属性
            })).pipe(fs.dest('./dist'))
