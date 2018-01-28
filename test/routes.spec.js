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
})

describe('API Routes', () => {

})
