/* eslint-env mocha */
const expect = require('chai').expect;
const utils = require('./utils');

describe('tests for lib/utils.js', function() {
  it('should init', function() {
    expect(utils).to.be.an('object');
    expect(utils.time).to.be.a('function');
    expect(utils.timeEnd).to.be.a('function');
  });

  it('should handle time/timeEnd', function(done) {
    const TIME_RE = /^test execution time: 0s \d{3}(\.\d+)?ms$/;
    utils.time('test');
    setTimeout( () => {
      var a = utils.timeEnd('test');
      expect(TIME_RE.test(a)).to.equal(true);
      done();
    }, 110);
  });

  it('should handle more than a second', function(done) {
    const TIME_RE = /^test execution time: 1s \d+(\.\d+)?ms$/;
    utils.time('test');
    setTimeout( () => {
      var a = utils.timeEnd('test');
      expect(TIME_RE.test(a)).to.equal(true);
      done();
    }, 1010);
  });

  it('should handle time/time/timeEnd', function(done) {
    const TIME_RE = /^test execution time: 0s 0(\.\d+)?ms$/;
    utils.time('test');
    setTimeout( () => {
      utils.time('test');
      var a = utils.timeEnd('test');
      expect(TIME_RE.test(a)).to.equal(true);
      done();
    }, 100);
  });

  it('should handle only timeEnd', function() {
    var a = utils.timeEnd('test2')
    expect(a).to.equal(undefined);
  });

});
