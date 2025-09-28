const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8888;

const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];

    if (urlPath === '/') {
        urlPath = '/index.html';
    }

    const filePath = path.join(__dirname, urlPath);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 - Stránka nenalezena</h1>');
            return;
        }

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>500 - Chyba serveru</h1>');
                return;
            }

            const ext = path.extname(filePath);
            let contentType = 'text/html; charset=utf-8';

            if (ext === '.css') contentType = 'text/css; charset=utf-8';
            if (ext === '.js') contentType = 'application/javascript; charset=utf-8';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(port, () => {
    console.log(`📅 Nový Kalendář Úkolů běží na http://localhost:${port}/`);
    console.log('🎨 Moderní design inspirovaný Anthropic.com');
    console.log('🇨🇿 Kompletně v češtině');
});

process.on('SIGINT', () => {
    console.log('\n👋 Server zastaven');
    process.exit(0);
});