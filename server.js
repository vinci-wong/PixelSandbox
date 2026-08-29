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
  'index.html': 'text/html',
  'style.css': 'text/css',
  'main.js': 'text/javascript',
};

function getMimeType(str) {
  return mimeTypes[str];
}

const server = http.createServer((req, res) => {
  const sanitizedUrl =
    req.url === '/' ? 'index.html' : req.url.slice(1);
  const targetFile = files.includes(sanitizedUrl)
    ? sanitizedUrl
    : 'index.html';
  const filepath = path.join(
    'pixel-sandbox/',
    targetFile,
  );

  const mimeType =
    getMimeType(targetFile) || 'text/plain';

  const file = fs.readFileSync(filepath);
  res.writeHead(200, {
    'Content-Type': mimeType,
  });
  res.end(file);
});

server.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}/`,
  );
});
