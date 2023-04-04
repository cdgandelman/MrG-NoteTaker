// Import Express.js
const express = require('express');
const fs= require("fs");

// Import built-in Node.js package 'path' to resolve path of files that are located on the server
const path = require('path');

// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = process.env.PORT ||3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));
app.use(express.json())

app.get('/api/notes', (req, res) =>
  fs.readFile('./db/db.json', "utf-8", (err,data)=>{
    if (err) {
        res.send("File cannot be read")   
    }
    res.json(JSON.parse(data))
  })
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.post('/api/notes', (req, res) => {
    fs.readFile("./db/db.json","utf-8", (err,data)=>{
        if (err) {
            res.send("No File")   
        }
        data= JSON.parse(data)
        data.push(req.body)
        fs.writeFile("./db/db.json", JSON.stringify(data), (err)=>{
            if (err) {
                res.send("Unable to write to file")
            }
            res.json(data)
        })
    })
  });

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);