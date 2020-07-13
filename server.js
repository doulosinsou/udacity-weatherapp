// requires and packages
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser).urlencoded({extended: false});
app.use(bodyPaser.json());

const cors = require('cors');
app.use(cors());

// start server
const port = 3001;
const server = app.listen(port, runServer);

// server funcitons

function runServer() {
  console.log("this server is running on port " + port );
}
