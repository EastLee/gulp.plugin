const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', () => {
    return gulp.src('./app/src/app.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],//编译ES6
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});
