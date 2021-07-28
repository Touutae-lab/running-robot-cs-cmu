const http = require('http')
const fs = require('fs');
const {
  json
} = require('express');

// const Gpio = require('onoff');
// const m1a = new Gpio(19, "out");
// const m1b = new Gpio(26, "out");
// const m2a = new Gpio(20, "out");
// const m2b = new Gpio(21, "out");

const authCheck = () => {
  const password = require('./password.json');
  try {
    const check = require('./saved.json');
  } catch (err) {
    console.log("no Saved.json")
    return false;
  }
  const check = require('./saved.json');
  if (password.pass.includes(check.kuy)) {
    return true;
  }
}



const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    fs.readFile('./access.html', null, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('Some errors has Occurs!');
      } else {
        res.write(data);
      }
      return res.end()
    });
  }
  if (url === '/' && method === "POST") {
    const rawData = [];
    req.on('data', chunk => {
      rawData.push(chunk);
    });
    req.on('end', () => {
      let paredData = Buffer.concat(rawData).toString();
      const password = require('./password.json');
      code = paredData.slice(5);
      if (password.pass.includes(code)) {
        const savetext = {
          "kuy": code
        };
        const data = JSON.stringify(savetext);
        fs.writeFile('saved.json', data, (err) => {
          if (err) {
            throw err;
          }
          console.log("Json data saved!")
        });
        fs.readFile("./control.html", null, (err, data) => {
          if (err) { 
            res.writeHead;
            res.write("Your password wrong or Your passcode wrong");
            res.end()
          } else {
            res.end(data);
          }
        });
      }
      // if (paredData in pss) {
      //   res.writeHead(200, {
      //     'Content-type': 'text/html'
      //   });
      //   fs.readFile("./control.html", null, (err, data) => {
      //     if (err) {
      //       res.writeHead(404);
      //       res.write("Some Error Occures");
      //     }
      //     else {
      //       res.write(data);
      //       return res.end();
      //     }
      //   });
      // }
      // else {
      //   fs.readFile("./wrong.html", null, (error, data) => {
      //     if (error) {
      //       res.writeHead(404);
      //       res.write("Stupid shit");
      //              }
      //     else {
      //       res.writeHead(200, {
      //         'Content-type': 'text/html'
      //       });
      //       res.write(data);
      //       return res.end();
      //     }
      //   });
      // }
    });
  }


  if (url === '/forward' && method === 'POST' && authCheck()) {
    console.log('Forward');
    // m1a.writeSync(0);
    // m1b.writeSync(1);
    // m2a.writeSync(1);
    // m2b.writeSync(0);
  }
  if (url === '/right' && method === 'POST' && authCheck()) {
    console.log('Right');
    // m1a.writeSync(0);
    // m1b.writeSync(1);
    // m2a.writeSync(0);
    // m2b.writeSync(0);
  }
  if (url === '/left' && method === 'POST' && authCheck()) {
    console.log('Left');
    // m1a.writeSync(0);
    // m1b.writeSync(0);
    // m2a.writeSync(1);
    // m2b.writeSync(0);
  }
  if (url === '/reverse' && method === 'POST' && authCheck()) {
    console.log('Reverse');
    // m1a.writeSync(1);
    // m1b.writeSync(0);
    // m2a.writeSync(0);
    // m2b.writeSync(1);
  }
  if (url === '/stop' && method === 'POST' && authCheck()) {
    console.log('Reverse');
    // m1a.writeSync(0);
    // m1b.writeSync(0);
    // m2a.writeSync(0);
    // m2b.writeSync(0);
  }
});

server.listen(3000);