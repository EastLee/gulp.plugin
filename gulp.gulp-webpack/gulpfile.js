var gulp = require('gulp');
var webpack = require('gulp-webpack');
gulp.task('default', function() {
  return gulp.src('app/src/index.js')
    .pipe(webpack({
    watch: true,
    devtool: 'source-map',
    entry: {
        index: './app/src/index.js'
    },
    output: {
        filename: '[name].js',
    },
    module: {
      loaders: [
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
  }))
    .pipe(gulp.dest('app/dist/'));
});
//webpack 中的配置可以写在webpack.config.js中
