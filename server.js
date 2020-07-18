// requires and packages
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// start server
const port = 3001;
const server = app.listen(port, runServer);

// server funcitons

function runServer() {
  console.log("this server is running on port " + port);
}

app.use(express.static('weatherpage'));

// Post weather Data

const projectData = {};
app.post('/weather', addweatherdata);

function addweatherdata(req, res) {
  projectData.data = req.body;
  res.send(projectData.data);

  console.log(projectData.data);
  console.log("weather data pushed successfully");
}

// Get weather Data
app.get('/weather', getWeather);

function getWeather(req, res) {
  res.send(projectData);
  console.log('Projectdata requested')
}

// post journal data
const journalData = [];
app.post('/journal', addjournaldata);

function addjournaldata(req, res) {
  journalData.push(req.body);
  res.send(journalData);

  console.log("journal data pushed successfully");
}

// Get journal Data
app.get('/journal', getJournal);

function getJournal(req, res) {
  res.send(journalData);
  console.log('journalData requested')
}
