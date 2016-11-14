var connect = require('connect');
var http = require('http');

var app = connect();

app.use('/foo', function fooMiddleware(req, res, next) {
  res.end('hello world!')
  next();
});

http.createServer(app).listen(3000,'localhost',function(){
    console.info('watch!');
});
