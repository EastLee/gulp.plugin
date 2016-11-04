var gulp = require('gulp');
var rename = require("gulp-rename");

// rename via string
gulp.task('default', function() {
    gulp.src("./src/main/text/hello.txt")
        .pipe(rename("lib/main/text/ciao/goodbye.md"))
        .pipe(gulp.dest("./dist"));
})


// rename via function
gulp.task('rename-func', function() {
    gulp.src("./src/**/hello.txt")
        .pipe(rename(function(path) {
            path.dirname += "/ciao";
            path.basename += "-goodbye";
            path.extname = ".md"
        }))
        .pipe(gulp.dest("./dist"));
})


// rename via hash
gulp.task('rename-hash', function() {
    gulp.src("./src/main/text/hello.txt", {
            base: process.cwd()
        })
        .pipe(rename({
            dirname: "main/text/ciao",
            basename: "aloha",
            prefix: "bonjour-",
            suffix: "-hola",
            extname: ".md"
        }))
        .pipe(gulp.dest("./dist"));
})
