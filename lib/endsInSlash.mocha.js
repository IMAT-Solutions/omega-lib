/* eslint-env mocha */
const expect = require('chai').expect;
const endsInSlash = require('./endsInSlash');

describe('tests for lib/endsInSlash.js', function() {
  it('should init', function() {
    expect(endsInSlash).to.be.a('function');
  });

  it('should handle strings', function() {
    expect(endsInSlash('this is a test/')).to.equal(true);
    expect(endsInSlash('this is a test\\')).to.equal(true);
    expect(endsInSlash('this is a test/s')).to.equal(false);
    expect(endsInSlash('this is a test')).to.equal(false);
    expect(endsInSlash('')).to.equal(false);
  });

  it('should handle null', function() {
    expect(endsInSlash(null)).to.equal(false);
  });

  it('should handle undefined', function() {
    expect(endsInSlash()).to.equal(false);
  });

  it('should handle object', function() {
    expect(endsInSlash({})).to.equal(false);
  });

  it('should handle array', function() {
    expect(endsInSlash([])).to.equal(false);
  });

  it('should handle number', function() {
    expect(endsInSlash(10)).to.equal(false);
  });
});
