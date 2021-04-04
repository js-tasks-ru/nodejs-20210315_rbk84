const url = require('url');
const http = require('http');
const path = require('path');
const {unlink} = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'DELETE':
      if (pathname.includes('/')) {
        res.statusCode = 400;
        res.end();

        return;
      }

      unlink(filepath, (error) => {
        if (error) {
          if (error.code === 'ENOENT') {
            res.statusCode = 404;
            res.end('Not found');
          } else {
            res.statusCode = 500;
            res.end('Something went wrong');
          }
        } else {
          res.statusCode = 200;
          res.end('OK');
        }
      });

      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
