var glob = require("glob");
var files = glob.sync('./src/*/index.js');
console.info(files);

glob("./src/*/index.js", {}, function (er, files) {
    console.info(files);
})
