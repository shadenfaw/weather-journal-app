// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
var express = require('express');

var cors = require('cors');
var bodyParser = require('body-parser')


// Start up an instance of app
var app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/getAllData', function (req, res) {
    res.send(projectData);
})

app.post('/addData', (req, res) => {
    const data=req.body;

    console.log('Got body:', data);

    projectData.temperature=data.temperature;
    projectData.date=data.date;
    projectData.feeling =data.feeling;

    res.send('Data added successfully');

});

// Setup Server
app.listen(3000, function () {
    console.log('web server listening on port 3000');
  })