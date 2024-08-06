const http = require('http');

const server = http.createServer(function (req, res) {
    console.log(req);
    res.writeHeader(200);
    res.write('Hello World!');
    res.end();
});

server.listen(3000, function () {
    console.log('Server started');
});