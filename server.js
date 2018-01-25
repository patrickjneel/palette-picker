const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.locals.title = 'Palette-Picker';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is listening at ${app.get('port')}`)
})

app.get('/', (request, response) => {
  return response.send('palettepicker');
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
      return response.status(200).json({ projects })
    })
    .catch(error => {
      return response.status(500).json({ error})
    })
})

app.get('/api/v1/projects/palettes', (request, response) => {
  const { id } = request.params;
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

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for(let requiredParams of ['projectName']) {
    if(!project[requiredParams]) {
      return response.status(422).json({
        error: `You are missing a required a field ${requiredParams}`
      })
    }
  }
    database('projects').insert(project, 'id')
      .then(project => {
        return response.status(201).json({ id: project[0] })
      })
      .catch(error => {
        return response.status(500).json({ error })
      })
})

// app.get('/api/v1/projects/:id/palettes', (request, response) => {
//   const { id } = request.params;
//   // const palette = request.body;
//   database('palette').where('projects_id', id).select()
//       .then(palette => {
//         if(palette.length) {
//         return response.status(200).json({ palette }) 
//       } else {
//         return response.status(404).json({
//           error: `Could not find the palette with a project id of ${id}`
//         })
//       }
//     })
//     .catch(error => {
//       return response.status(500).json({ error })
//     })
// })

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const { id } = request.params;
  const palette = Object.assign({}, request.body, {projects_id: id});

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
      console.log(error)
        return response.status(500).json({ error })
      })
})
