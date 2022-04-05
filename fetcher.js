const request = require('request');
const fs = require('fs');
const readline = require('readline');
const isInvalid = require('is-invalid-path');
require('process');

const RL = readline.createInterface(process.stdin, process.stdout);
const strURL = process.argv[2];
const strFilePath = process.argv[3];

if (isInvalid(strFilePath.slice(2))) {
  console.log(strFilePath, 'is an invalid file path');
  process.exit(1);
};

request(strURL, (err, response, body) => {
  if (err) {
      console.log(err);
      process.exit(1);
  } 
    
  fs.readFile(strFilePath, (error) => {
    if (!error) {
      console.log(error);
      RL.question('File exists, would you like to overwrite it? ', answer => {
        if (answer.toUpperCase === 'Y') {
          fs.writeFile(strFilePath, body, err => {
            if (err) {
              console.log(err);
              process.exit(0);
            }
          });
        } else process.exit(0);
      });
    } else {
      console.log(error);
      fs.writeFile(strFilePath, body, err => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        process.exit(0);
      });
    }
  });
});
