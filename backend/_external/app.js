// Requiring express in our server
const express = require('express');
const app = express();
const testFolder = '/home/pavel/test-data';//'./widgets/';
//const fs = require('fs');
const fs = require('fs/promises'); 
const path = require('path');

// Defining get request at '/' route
app.get('/', function(req, res) {
  console.log("root");
  res.json({
    number: 1
  });
});

async function walkDir(dir, result = {}) {
  let list = await fs.readdir(dir);
  for(let item of list) {
      const itemPath = path.join(dir, item);
      let stats = await fs.stat(itemPath)
      if (await stats.isDirectory()) {
          result[item] = {};
          await walkDir(itemPath, result[item]);
      } else {
          const fileName = path.basename(item, path.extname(item));
          result[fileName] = JSON.parse(await fs.readFile(itemPath, { encoding: 'utf-8'}));
      }
  }
  return result;
}

// Defining get request at '/files' route
app.get('/files',async function(req, res) {
  console.log("files");
  let result = await walkDir(testFolder);
  //console.log("Result:", JSON.stringify(result, null, 2));
  res.json(result);
});

// Defining get request at '/multiple' route
app.get('/multiple', function(req, res) {
  console.log("multiple");
  res.json({
    number: 1,
    name: 'John',
    gender: 'male'
  });
});
  
// Defining get request at '/array' route
app.get('/array', function(req, res) {
  console.log("array");
  res.json([{
      number: 1,
      name: 'John',
      gender: 'male'
    },
    {
      number: 2,
      name: 'Ashley',
      gender: 'female'
    },
    {
      number: 3,
      name: 'Pavel',
      gender: 'male'
    },
    {
      number: 2,
      name: 'Jana',
      gender: 'female'
    }
  ]);
});
  
// Setting the server to listen at port 3000
app.listen(3000, function(req, res) {
  console.log("Server is running at port 3000");
});