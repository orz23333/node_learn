function route(pathname, handle, res, req) {
  console.log("About to route a request for " + pathname);

  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req);
  } else {
    console.error("No request handler found for " + pathname);
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });
    res.write('404 not found');
    res.end();
  }
}

module.exports = route