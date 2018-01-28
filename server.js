//You need to require the Express library
const express = require('express');
//Need to require body-parser so that you can parse the body of an HTTP request
const bodyParser = require('body-parser');
//Setting app = express instantiate a new app
const app = express();
//Setting up the envrionment that determinnes how the app should run or behave.
const environment = process.env.NODE_ENV || 'development';
//configuration tells how the app where the conneciton to the app is and where the schema and 
//and seed data is located within the app
const configuration = require('./knexfile')[environment];
//the database variable is the glue that connects the database to your configuration file
const database = require('knex')(configuration);

//it sets the port at the environment port or if that fails as a defualt of 3000
app.set('port', process.env.PORT || 3000);
//this tells the bodyparser to make the body of the HTTP request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//This serves up the static assests from /public directory i.e. HTML, CSS, JS
app.use(express.static(__dirname + '/public'));
//Sets the title of the application
app.locals.title = 'Palette-Picker';
//app.listen is listening for the port, which is telling the app where it will run
app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is listening at ${app.get('port')}`)
})
//this is the home indicated by the / and you need a request and response as parameters
app.get('/', (request, response) => {
//you need to return the response.send to get the name
  return response.send('palettepicker');
});
//app.get is an endpoint that will get all of the projects from the database
app.get('/api/v1/projects', (request, response) => {
//you need to specify the projects table from within the database and select it
  database('projects').select()
//the .then returns a promise
    .then(projects => {
//if the request was successful then it responds with a successful get status code of 200 and returns a json object of all the projects.
      return response.status(200).json({ projects })
    })
//the .catch handles the error if the request was unsuccessful 
    .catch(error => {
//if it was unsuccessful then it responds with a status code of 500, which is an internal server error and returns a json object with the error.
      return response.status(500).json({ error})
    })
})

//app.get is an endpoint that will get all of the palettes from the database
app.get('/api/v1/projects/palettes', (request, response) => {
  database('palette').select()
    .then(palette => {
      if(palette.length) {
        return response.status(200).json({ palette })
      } else {
        return response.status(404).json({
          error: 'Could not find the platte'
        })
      }
    })
    .catch(error => {
      return response.status(500).json({ error })
    })
})
//app.post is the endpoint or url to post a new project to our database
app.post('/api/v1/projects', (request, response) => {

//we create a new variable set equal to request.body which is the entire projects object 
  const project = request.body;
//this for loop loops over the required parameters to make a successful post to the database
  for(let requiredParams of ['projectName']) {
//if the required parameters are not there 
    if(!project[requiredParams]) {
//then it returns a response of an unsuccessful status with an error 
//stating which required parameters you're missing to have successful post to the database
      return response.status(422).json({
        error: `You are missing a required a field ${requiredParams}`
      })
    }
  }
//you specify that want to post to the specific database and insert the projects project and id
    database('projects').insert(project, 'id')
//that returns a promise 
      .then(project => {
//if the request was successful then it responds with a successful status for for a post request and returns a json object with the id and the project
//[0] needs to be used because knex returns an array?
        return response.status(201).json({ id: project[0] })
      })
//the .catch is if the request was unsuccessful 
      .catch(error => {
//it retruns a response with an unsuccessful status code and returns a json object of the error
        return response.status(500).json({ error })
      })
})

app.post('/api/v1/projects/:projectId/palettes', (request, response) => {
  const { projectId } = request.params;
  const palette = Object.assign({}, request.body.palette, {projects_id: projectId});

  for(let requiredParams of ['projectName', 'paletteName', 'color1', 'color2', 'color3', 'color4','color5' ]) {
    if(!palette[requiredParams]) {
      return response.status(422).json({
        error: `You are missing a required field ${requiredParams}`
      })
    }
  }
    database('palette').insert(palette, 'id')
      .then(palette => {
        return response.status(201).json({ id: palette[0] })
      })
      .catch(error => {
        return response.status(500).json({ error })
      })
})

app.delete('/api/v1/projects/palettes/:id', (request, response) => {
  const id  = request.params;

  database('palette').where(id).del()
    .then(palette => {
      if(!palette) {
        response.status(422).json({error: 'This palette does not exist'})
      } else {
        response.sendStatus(204);
      }
    })
    .catch(error => response.status(500).json({ error}))
});
