const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3032;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".wasm": "application/wasm",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  let decodedUrl = decodeURIComponent(req.url.split("?")[0]);
  if (decodedUrl === "/" || decodedUrl === "") {
    decodedUrl = "/index.html";
  }

  const filePath = path.join(PUBLIC_DIR, decodedUrl);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback for missing images: return a 1x1 transparent WebP/PNG so it never blocks WebGL
      const ext = path.extname(decodedUrl).toLowerCase();
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".webp") {
        // Return 1x1 transparent PNG buffer
        const transparentPng = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400",
          "Access-Control-Allow-Origin": "*"
        });
        res.end(transparentPng);
        return;
      }

      if (!ext) {
        const indexPath = path.join(PUBLIC_DIR, "index.html");
        fs.readFile(indexPath, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(data);
          }
        });
        return;
      }
      res.writeHead(404);
      res.end("Not Found: " + decodedUrl);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Mirror Server with 3D model and i18n running at http://localhost:${PORT}/`);
});
