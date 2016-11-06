const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const spriter = require('gulp-css-spriter');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const del = require('del');
const mkdirp = require('mkdirp');
const connect = require('gulp-connect');
const opn = require('opn');

var dirPaths = {
    html: './html',
    css: {
        src: './src/css',
        dist: './dist/css'
    },
    js: {
        src: './src/js',
        dist: './dist/js'
    },
    img: {
        src: './src/img',
        dist: './dist/img'
    },
    mock:'./mock',
    doc: './doc',
    tool: './tool'
}

var serverConfig = {
    root: './',//设置根目录
    livereload: true,//启动实施监控
    port: 8888,//设置端口
    name: 'Dev App',//设置服务器名字
    domain:'localhost'
}

//创建开发目录
gulp.task('init', function() {
    var dirs = [dirPaths.html, dirPaths.css.src, dirPaths.js.src, dirPaths.doc, dirPaths.img.src, dirPaths.tool];
    dirs.forEach(dir => {
        mkdirp.sync(dir);
    })
});

//处理css文件
gulp.task('g-css', function() {

    return gulp.src(dirPaths.css.src + '/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            // outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename({}))
        .pipe(gulp.dest(dirPaths.css.dist));
});

//处理图片
gulp.task('g-image', function() {
    return gulp.src(dirPaths.img.src + '/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dirPaths.img.dist))
});

//处理css和img
gulp.task('g-style',['g-css','g-image'],function(){
    gulp.src(dirPaths.css.dist + '/**/*.css')
        .pipe(spriter({
            'spriteSheet': dirPaths.img.dist+'/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
        }))
        .pipe(gulp.dest(dirPaths.css.dist));
});


//处理js文件
gulp.task('g-js', function() {
    gulp.src(dirPaths.js.src + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())//有一定的语法检测能力，如果语法错的太离谱，这里可能会报错
        .pipe(gulp.dest(dirPaths.js.dist));
});


//删除生成文件
gulp.task('del',function(){
    del(['./dist']).then(function(){
        console.info('delete success!');
    })
});

gulp.task('openbrowser', function() {
  opn( 'http://' + serverConfig.domain + ':' + serverConfig.port );
});

gulp.task('connect', function() {
    connect.server({
        root: serverConfig.root,//设置根目录
        livereload: serverConfig.livereload,//启动实施监控
        port: serverConfig.port,//设置端口
        name: serverConfig.name//设置服务器名字
    });
});

gulp.task('g-reload',function(){
     gulp.src('./src/**/*.*')
    .pipe(connect.reload())
})

//监听
gulp.task('g-watch',function(){
    //watch 只能监听现存的文件对于新建文件 无法监听
    gulp.watch(dirPaths.html+'/**/*.html',['g-reload']);
    gulp.watch(dirPaths.js.src+'/**/*.js',['g-reload','g-js']);
    gulp.watch(dirPaths.css.src+'/**/*.scss',['g-reload','g-style']);
});


gulp.task('default',['connect','g-watch','openbrowser'])