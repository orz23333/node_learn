const exec = require("child_process").exec;
const querystring = require("querystring");
const fs = require('fs');
const formidable = require('formidable');

const handle = {

  ['/']: function (response) {
    handle['/start'](response);
  },

  ['/start']: function (response) {
    console.log('Start was called!')

    var body = '<html>' +
      '<head>' +
      '<meta http-equiv="Content-Type" ' +
      'content="text/html; charset=UTF-8" />' +
      '</head>' +
      '<body>' +
      '<form action="/upload" enctype="multipart/form-data" ' +
      'method="post">' +
      '<input type="file" name="upload">' +
      '<input type="submit" value="Upload file" />' +
      '</form>' +
      '</body>' +
      '</html>';

    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
  },

  ['/upload']: function (response, request) {
    console.log('Upload was called!')

    const form = new formidable.IncomingForm();
    form.uploadDir = 'tmp';
    console.log('about to parse')

    form.parse(request, (error, fields, files) => {
      console.log('Parsing done')

      fs.renameSync(files.upload.path, "./tmp/test.jpg");
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write('Receive image: </br>');
      response.write("<img src='/show' />")
      response.end();
    })
  },

  ['/show']: function (response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile('./tmp/test.jpg', 'binary', (err, file) => {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.write(err + '\n');
        response.end();
      } else {
        response.writeHead(200, {
          "Content-Type": "image/jpg"
        });
        response.write(file, "binary");
        response.end();
      }
    })
  }
}

module.exports = handle;