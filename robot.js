const http = require('http')
const fs = require('fs');


const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method; 
  if (url === "/") { 
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    fs.readFile('./access.html', null, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('Some errors has Occurs!');
      }
      else {
        res.write(data);
      }
      return res.end()
    });
  }
  if (url === '/robot' && method === "POST") {
    const rawData = [];
    req.on('data', chunk => {
      rawData.push(chunk);
    });
    return req.on('end', () => {
      let paredData = Buffer.concat(rawData).toString();
      console.log(paredData);
      fs.readFile();
      let pss = require('./password.json');
      if (paredData in pss) {
        res.write()
      }
      else {
        fs.readFile("./wrong.html", null, (error, data) => {
          if (error) {
            res.writeHead(404);
            res.write('<body onload="back()"><h1>Your Acess code is incorrect or expired!<h1></body>');
            res.write("<script>function back() {\n windows.history.back();}</script>");
                   }
          else {
            res.write(data);
          }
          return res.end();
        });
      }
  });
  }
});
server.listen(3000);
