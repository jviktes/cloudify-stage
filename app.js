/* eslint-disable no-console, no-process-exit */
// @ts-nocheck File not migrated fully to TS
const express = require('express');
const app = express();

const fs = require('fs/promises'); 
const path = require('path');

// Defining get request at '/' route
app.get('/', function(req, res) {
  console.log("root");
  res.json({
    number: 1
  });
});
// Defining get request at '/array' route
app.get('/quantity', function(req, res) {
  console.log("quantity");
  res.json(
    {
      "default": 20,
      "description": "Poksuný vstup",
      "type": "integer",
      "constraints": [
          {
              "valid_values": [
                  10,
                  20,
                  30,
                  40,
                  50,
              ]
          }
      ]
    }
  );
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