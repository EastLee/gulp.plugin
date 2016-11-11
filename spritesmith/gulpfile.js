var gulp = require('gulp');

var Promise = require('bluebird');
var Spritesmith = require('spritesmith');
var spritesmithBuild = Promise.promisify(Spritesmith.run);

var _Spritesmith = new Spritesmith();
console.info(_Spritesmith.createImages);
var spritesmithCreateImages = Promise.promisify(_Spritesmith.createImages.bind(_Spritesmith));
var spritesmithProcessImages = Promise.promisify(_Spritesmith.processImages);


var fs = require('fs-extra');
var outputFile = Promise.promisify(fs.outputFile);

var sprites = ['./img/fork.png', './img/github.png', './img/twitter.png'];


gulp.task('task1', function() {
    spritesmithBuild({
        src: sprites,
        algorithm: "top-down",//'alt-diagonal'
        padding: 50
    }).then(function(result) {
        console.info(result.coordinates);
        fs.outputFile('./img/sprite.png', result.image, 'binary');
    })
});

gulp.task('task2', function() {
    spritesmithCreateImages(sprites).then(function(images) {
        var result = _Spritesmith.processImages(images);
        return result;
    }).then(function(result){
        console.info(result.image);
    })
})
