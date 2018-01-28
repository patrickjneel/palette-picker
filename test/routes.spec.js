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
})
