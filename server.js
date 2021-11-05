/*terminal side codes:
to check node is install correctly : node -v
to create package.json : npm init
to install packages: npm i express body-parser cors
to debbuge tserver : node  server.js
*/

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express= require ('express')

// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require ('cors')
app.use(cors())


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 9090;
// server call back function (debbuger)
const server = app.listen(port,testServer);

function testServer(){
    // terminal will print " server is curently running on localhost : + port value"
    console.log ('server is curently running on localhost : ' + port);
}

// Initialize all route with a callback function
app.get('/getCurrentWeather',getDataFunc);

// Callback function to complete GET '/all'
function getDataFunc (request,responde){
    // req is request and res is responde
    responde.send(projectData)
}

// Post Route
app.post('/postCurrentWeather',postGivenData);
function postGivenData ( request,responde){
    projectData['date']=request.body.date;
    projectData['temp']=request.body.temp;
    projectData['feelings']=request.body.feelings
    
    responde.send(projectData);
}
