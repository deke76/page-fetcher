const request = require('request');
const fs = require('fs');

const strURL = process.argv[2];
const strFilePath = process.argv[3];
console.log(strFilePath);

request((strURL), (error, response, body) => {
  fs.writeFile(strFilePath, body, err => {
    if (err) {
      console.log(err);
      return;
    }
  });
});