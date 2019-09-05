const http = require('http');
const fs = require('fs');
const url = require('url');

const port = 8080;

/* Global variables */
let listingData;
let server;

//  router object, more scalable and better for testing
const router = {
  '/listings GET': {
    mime: 'application/json',
  },
};
function requestHandler(request, response) {
  const parsedUrl = url.parse(request.url);
  const { method } = request;
  const route = parsedUrl.pathname;
  const match = router[`${route} ${method}`];

  if (!match) {
    response.writeHead(404).end('Bad gateway error');
    return;
  }

  response.writeHead(200, { 'Content-Type': match.mime });
  response.end(JSON.stringify(listingData));
}

fs.readFile('listings.json', 'utf8', (err, data) => {
  if (err) throw err;

  listingData = JSON.parse(data);

  server = http.createServer(requestHandler);
  server.listen(port, () => {
    console.log(`server listening on: http://localhost:${port}`);
  });
});
