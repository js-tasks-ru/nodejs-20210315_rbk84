const url = require('url');
const http = require('http');
const path = require('path');
const {createReadStream} = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filePath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end();

        return;
      }

      const readStream = createReadStream(filePath);

      readStream.pipe(res);

      readStream.on('error', (err) => {
        if (err.code === 'ENOENT') {
          res.statusCode = 404;
          res.end('File not found')
        } else {
          res.statusCode = 500;
          res.end('Something went wrong');
        }
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;