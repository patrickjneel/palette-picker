const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server  = require('../server');
const knex = require('../db/knex.js');

const environment = process.env.NODE_ENV || 'test';

chai.use(chaiHttp);

describe('Client Side Routes', () => {
  it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200)
      response.should.be.html
    })
    .catch(error => {
      return error
    })
  })

  it('should return a 404 if the route doesnt exist', () => {
    return chai.request(server)
    .get('/sad')
    .then(response => {
      response.should.have.status(404)
    })
    .catch(error => {
      throw error;
    })
  })
})

describe('API Routes', () => {
  it('should get all of the projects', () => {
    return chai.request(server)
    .get('/api/v1/projects')
    .then(response => {
      response.status.have.status(200)
      response.should.be.json
      response.body.should.be.a('object')
      response.res.should.be.a('object')
    })
    .catch(error => {
      return error
    })
  })
  it('should return all of the palettes', () => {
    return chai.request(server)
    .get('/api/v1/palettes')
    .then(response => {
      response.status.have.status(200)
      response.should.be.json
      ressponse.body.should.be.a('object')
      response.res.should.be.a('object')
    })
    .catch(error => {
      return error;
    })
  })

  it('should post a new project', () => {
    return chai.request(server)
    .post('/api/v1/projects')
    .send({
      projectName: 'Stormy-Morning'
    })
    .then(response => {
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('projectName')
    })
    .catch(error => {
      return error;
    })
  })


  it('should throw and error if the endpoint is wrong for posting a new project', () => {
    return chai.request(server)
    .post('/api/v1/sad')
    .send({
      projectName: 'Stormy-Morning'
    })
     .then(response => {
      response.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('projectName')
    })
    .catch(error => {
      return error;
    })
  })

  it('should post a palette to the database', () => {
    return chai.request(server)
    .post('api/v1/projects/1/palettes')
    .send({
      projectName: 'Stuff',
      paletteName: 'Morning-Corgi',
      color1: '#ffffff',
      color2: '#ffffff',
      color3: '#ffffff',
      color4: '#ffffff',
      color5: '#ffffff'
    })
    .then(response => {
      repsonse.should.have.status(201)
      response.body.should.be.a('object')
      response.body.should.have.property('projectName')
      response.body.should.have.property('paletteName')
      response.body.should.have.property('color1')
      response.body.should.have.property('color2')
      response.body.should.have.property('color3')
      response.body.should.have.property('color4')
      response.body.should.have.property('color5')
    })
    .catch(error => {
      return error;
    })
  })
})
