var gutil = require('gulp-util');

gutil.log('stuff happened', 'Really it did', gutil.colors.magenta('123'));

gutil.beep();

var aa = gutil.replaceExtension('./file.coffee', '.js'); // file.js
// console.info(aa);
var opt = {
  name: 'todd',
  file: 'someGulpFile'
};
var str = gutil.template('test <%= name %> <%= file.path %>', opt)
// console.info(str);

var err = new gutil.PluginError('test', {
  message: 'something broke',
  showStack: true
});

var err = new gutil.PluginError({
  plugin: 'test',
  message: 'something broke'
});

var err = new gutil.PluginError('test', 'something broke');

var existingError = new Error('OMG');
var err = new gutil.PluginError('test', existingError, {showStack: true});

console.info(err);
