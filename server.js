const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.locals.title = 'Palette-Picker';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is listening at ${app.get('port')}`)
})

app.get('/', (request, response) => {
  return response.send('Platte-Picker');
});
