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
const spriter = require('gulp-cross-spriter');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const del = require('del');
const mkdirp = require('mkdirp');
const connect = require('gulp-connect');
const opn = require('opn');
const zip = require('gulp-zip');
const sftp = require('gulp-sftp');

var dirPaths = {
    devPath: './src',
    proPath: './dist',
    zip: {
        cprPath: './dist/**/*.*',
        outpath: './zip',
        name: 'dist.zip'
    },
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
    mock: './mock',
    doc: './doc',
    tool: './tool'
};

var spriteConfig = {
    'spriteSheet': dirPaths.img.dist,
    'pathToSpriteSheetFromCSS': '../img/png',
    'spritesmithOptions': {
        algorithm: "top-down", //'alt-diagonal'
        padding: 50
    },
    'cssPath': dirPaths.css.dist,
    'absolutePathToSpriteSheetFromCSS': {
        sKey: true,
        absolutePath: 'http://img.google.com/static/image/',
        specialPath: {
            index: 'http://img.google.com/static/index/',
            main: 'http://img.google.com/static/main/'
        }
    }
};

var serverConfig = {
    root: './', //设置根目录
    livereload: true, //启动实施监控
    port: 8888, //设置端口
    name: 'Dev App', //设置服务器名字
    domain: 'localhost'
};

var uploadConfig = {
    proPath: '',
    host: 'website.com',
    user: 'johndoe',
    pass: '1234',
    port: 22,
    remotePath: '/',
    // timeout:''
}

//创建开发目录
gulp.task('g-init', function() {
    var dirs = [dirPaths.html, dirPaths.css.src, dirPaths.js.src, dirPaths.doc, dirPaths.img.src, dirPaths.tool];
    dirs.forEach(dir => {
        mkdirp.sync(dir);
    })
});

//处理css文件
gulp.task('g-css', function() {
    return gulp.src(dirPaths.css.src + '/**/*.scss')
        .pipe(sourcemaps.init())//生成map
        .pipe(sass({//编译sass文件
            outputStyle: 'compressed'//压缩
        }).on('error', sass.logError))
        .pipe(autoprefixer())//添加前缀
        .pipe(sourcemaps.write())
        .pipe(rename({}))//重命名
        .pipe(gulp.dest(dirPaths.css.dist));
});

//处理图片
gulp.task('g-image', function() {
    return gulp.src(dirPaths.img.src + '/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest(dirPaths.img.dist))
});

//处理css和img
gulp.task('g-style', ['g-css', 'g-image'], function() {
    gulp.src(dirPaths.css.dist + '/**/*.css')
        .pipe(spriter(spriteConfig))
});


//处理js文件
gulp.task('g-js', function() {
    gulp.src(dirPaths.js.src + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(uglify()) //有一定的语法检测能力，如果语法错的太离谱，这里可能会报错
        .pipe(gulp.dest(dirPaths.js.dist));
});


//删除生成文件
gulp.task('g-del', function() {
    del([dirPaths.proPath]).then(function() {
        console.info('delete success!');
    })
});

gulp.task('g-openbrowser', function() {
    opn('http://' + serverConfig.domain + ':' + serverConfig.port);
});

gulp.task('g-connect', function() {
    connect.server({
        root: serverConfig.root, //设置根目录
        livereload: serverConfig.livereload, //启动实施监控
        port: serverConfig.port, //设置端口
        name: serverConfig.name //设置服务器名字
    });
});

gulp.task('g-reload', function() {
    gulp.src(dirPaths.devPath + '/**/*.*')
        .pipe(connect.reload())
})

//监听
gulp.task('g-watch', function() {
    //watch 只能监听现存的文件对于新建文件 无法监听
    gulp.watch(dirPaths.html + '/**/*.html', ['g-reload']);
    gulp.watch(dirPaths.js.src + '/**/*.js', ['g-reload', 'g-js']);
    gulp.watch(dirPaths.css.src + '/**/*.scss', ['g-reload', 'g-style']);
});


gulp.task('default', ['g-connect', 'g-watch', 'g-openbrowser']);

gulp.task('g-zip', function() {
    return gulp.src(dirPaths.zip.cprPath)
        .pipe(zip(dirPaths.zip.name))
        .pipe(gulp.dest(dirPaths.zip.path));
});

gulp.task('g-upload', function() {
    return gulp.src(uploadConfig.proPath)
        .pipe(sftp(uploadConfig));
});
