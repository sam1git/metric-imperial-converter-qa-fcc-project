const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);

  test('get request with valid input', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=10L')
      .end(function (err, res) {
        assert.equal(res.status, 200, 'res status expected 200');
        assert.isObject(JSON.parse(res.text), 'output expected to be of type object');
        assert.property(JSON.parse(res.text), 'returnUnit', 'output object expected to have property returnUnit');
        assert.property(JSON.parse(res.text), 'returnNum', 'output object expected to have property returnNum');
        assert.property(JSON.parse(res.text), 'initNum', 'output object expected to have property initNum');
        assert.property(JSON.parse(res.text), 'initUnit', 'output object expected to have property initUnit');
        assert.property(JSON.parse(res.text), 'string', 'output object expected to have property string');
        done();
      });
  });

  test('get request with invalid input unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=32g')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'res status expected 200');
        assert.equal(res.text, 'invalid unit', 'output expected to be a string: invalid unit');
        done();
      });
    });

  test('get request with invalid input number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kg')
      .end(function(err,res) {
        assert.equal(res.status, 200, 'res status expected 200');
        assert.equal(res.text, 'invalid number', 'output expected to be a string: invalid number')
        done();
      });
  });

  test('get request with invalid number and unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=3/7.2/4kilomegagram')
      .end(function(err, res) {
        assert.equal(res.status, 200, 'res status expected 200');
        assert.equal(res.text, 'invalid number and unit', 'output expected to be a string: invalid number and unit');
        done();
      });
  });

  test('get request with no number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=kg')
      .end(function(err,res) {
        assert.equal(res.status, 200, 'res status expected 200');
        assert.equal(JSON.parse(res.text).initNum, 1, 'output expected to be number 1');
        done();
      })
  });
    
});
