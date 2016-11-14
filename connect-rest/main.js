var connect = require('connect');
var http = require('http');

var Rest = require('connect-rest');

var options = {
    context: '/api',
    logger: {
        file: 'mochaTest.log',
        level: 'debug'
    },
    // apiKeys: ['849b7648-14b8-4154-9ef2-8d1dc4c2b7e9']
}

var rest = Rest.create(options);

var app = connect();

http.createServer(app).listen(3000, 'localhost', function() {
    console.info('watch!');
});

app.use(rest.processRequest());

rest.get('/books', function(req, res) {
    // console.info(res);
    // res.end('connect-rest');
    return {aa:'connect-rest'};
    // callback(null, {
    //     name: 'John Doe'
    // });
})
