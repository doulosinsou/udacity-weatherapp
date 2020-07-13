// requires and packages
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// start server
const port = 3001;
const server = app.listen(port, runServer);

// server funcitons

function runServer() {
  console.log("this server is running on port " + port );
}

app.use(express.static('weatherpage'));

// Post weather Data

const projectData = [];
app.post('/weather', addweatherdata);

function addweatherdata(req, res){
  projectData.push(req.body);
  console.log(req.body);
}

// Get weather Data
app.get('/weather', getWeather);
function getWeather(){
  res.send(projectData);
}
