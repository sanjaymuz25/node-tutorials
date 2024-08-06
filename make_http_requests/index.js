const http = require('http');
const axios = require('axios');

const server = http.createServer(function(req, res) {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
        res.writeHeader(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(response.data));
    }).catch(error => {
        console.log(error);
        res.writeHeader(500, {'Content-type': 'text/plain'});
        res.end('Something went wrong!');
    });
});


server.listen(3000, function() {
    console.log("Server started");
});