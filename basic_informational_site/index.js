const http = require('http');
const dotenv = require('dotenv').config();


const handleRequest = (url) => {
    const pages = {
        '/': '<h1>Home Page</h1>',
        '/index.html': '<h1>Home Page</h1>',
        '/about.html': '<h1>About</h1>',
        '/contact-me.html': '<h1>Contact Me</h1>',
        '/environment.html': `<h1>${process.env.MODE}</h1>`
    };

    return pages[url] || false;
}


const server = http.createServer((req, res) => {
    const response = handleRequest(req.url);

    if (response) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(response);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
