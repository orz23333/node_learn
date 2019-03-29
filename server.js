const http = require('http')
const url = require('url')

function start(route, handle) {
  let Print = true;

  const onRequest = (req, res) => {
    let pathname = url.parse(req.url).pathname; // 读取请求地址
    console.log('Request from ' + pathname + ' received')
    route(pathname, handle, res, req); //处理route
  };

  http.createServer(onRequest).listen(8888)

  console.log('Server has started');
}

module.exports = start