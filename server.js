import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 3000;

const files = [
  'index.html',
  'style.css',
  'main.js',
];

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
};

function getMimeType(extname) {
  return mimeTypes[extname];
}

const server = http.createServer((req, res) => {
  const reqFile =
    req.url === '/'
      ? 'index.html'
      : req.url.slice(1);

  if (!files.includes(reqFile)) {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.end('File not found.');
    return;
  }

  const filepath = path.join('./', reqFile);
  const extname = path.extname(reqFile);
  const mimeType =
    getMimeType(extname) || 'text/plain';

  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      res.writeHead(404, {
        'Content-Type': 'text/plain',
      });
      res.end('File not found.');
      return;
    }
    res.writeHead(200, {
      'Content-Type': mimeType,
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}/`,
  );
});
