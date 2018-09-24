let request = require('request-json');
let express = require('express');

let app = express();
var server = app.listen(3000, () => console.log('Server Listening'));
app.use(express.static('website'));

let jsonfile = require('jsonfile');
let client = request.createClient('http://localhost:8888/');

getJoke()
.then((result) => {
  let file = 'website/data.json';
  let data =  result.body;
  //{flag: 'a'} to append
  jsonfile.writeFile(file, data, err => {
    console.error(err);
  });
});


async function getJoke() {
  return await client.get('https://icanhazdadjoke.com/');
}
