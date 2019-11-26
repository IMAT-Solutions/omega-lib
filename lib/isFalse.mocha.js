/* eslint-env mocha */
const expect = require('chai').expect;
const isFalse = require('./isFalse');

describe('tests for lib/isFalse.js', function() {
  it('should init', function() {
    expect(isFalse).to.be.a('function');
  });

  it('should process process bool and null', function() {
    expect(isFalse(false)).to.equal(true);
    expect(isFalse(true)).to.equal(false);
    expect(isFalse()).to.equal(false);
    expect(isFalse(null)).to.equal(false);
  });

  it('should process process a number', function() {
    expect(isFalse(0)).to.equal(true);
    expect(isFalse(-1)).to.equal(false);
    expect(isFalse(1)).to.equal(false);
    expect(isFalse(2)).to.equal(false);
  });

  it('should process process a letter', function() {
    expect(isFalse('f')).to.equal(true);
    expect(isFalse('F')).to.equal(true);
    expect(isFalse('t')).to.equal(false);
    expect(isFalse('T')).to.equal(false);
    expect(isFalse('x')).to.equal(false);
    expect(isFalse('Y')).to.equal(false);
    expect(isFalse('R')).to.equal(false);
    expect(isFalse('a')).to.equal(false);
  });

  it('should process process a word', function() {
    expect(isFalse('false')).to.equal(true);
    expect(isFalse('FaLSe')).to.equal(true);
    expect(isFalse('FALSE')).to.equal(true);
    expect(isFalse('fals')).to.equal(false);
    expect(isFalse('falser')).to.equal(false);
    expect(isFalse('falsey')).to.equal(false);
    expect(isFalse('true')).to.equal(false);
    expect(isFalse('food')).to.equal(false);
  });
});
