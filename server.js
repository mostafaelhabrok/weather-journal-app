// Setup empty JS object to act as endpoint for all routes
projectData = {zipCode:[],feeling:[],date:[],temp:[],error:[]};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//const port = 8000;
const port = process.env.PORT || 80

const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log('running on localhost: '+port);
}
// Send Data
app.post('/add',add);

function add (req,res){

    projectData.zipCode.push(req.body.zipCode);
    projectData.feeling.push(req.body.feeling);
    projectData.date.push(req.body.date);
    projectData.temp.push(req.body.temp);
    projectData.error.push(req.body.error);
    res.send(projectData);
}
//Get Data
app.get('/all', function (request, response) {
    console.log(projectData);
    response.send({...projectData});
  });