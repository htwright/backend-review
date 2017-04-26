const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');

const should = chai.should();

const { app, runServer, closeServer } = require('../server');


chai.use(chaiHttp);

function seedData() {
  console.info('Seeding data');
}

describe('Hacker News API', function () {
  before(function () {
    return runServer();
  });

  beforeEach(function () {

  });

  afterEach(function () {

  });

  after(function () {
    return closeServer();
  });

  describe('Starter Test Suite', function () {
    it('should be true', function () {
      true.should.be.true;
    });
  });

});
