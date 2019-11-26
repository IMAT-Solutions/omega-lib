/* eslint-env mocha */
const expect = require('chai').expect;
const isTrue = require('./isTrue');

describe('tests for lib/isTrue.js', function() {
  it('should init', function() {
    expect(isTrue).to.be.a('function');
  });

  it('should process process bool and null', function() {
    expect(isTrue(true)).to.equal(true);
    expect(isTrue(false)).to.equal(false);
    expect(isTrue()).to.equal(false);
    expect(isTrue(null)).to.equal(false);
  });

  it('should process process a number', function() {
    expect(isTrue(1)).to.equal(true);
    expect(isTrue(-1)).to.equal(false);
    expect(isTrue(0)).to.equal(false);
    expect(isTrue(2)).to.equal(false);
  });

  it('should process process a letter', function() {
    expect(isTrue('t')).to.equal(true);
    expect(isTrue('T')).to.equal(true);
    expect(isTrue('f')).to.equal(false);
    expect(isTrue('F')).to.equal(false);
    expect(isTrue('x')).to.equal(false);
    expect(isTrue('Y')).to.equal(false);
    expect(isTrue('R')).to.equal(false);
    expect(isTrue('a')).to.equal(false);
  });

  it('should process process a word', function() {
    expect(isTrue('true')).to.equal(true);
    expect(isTrue('TrUe')).to.equal(true);
    expect(isTrue('TRUE')).to.equal(true);
    expect(isTrue('tru')).to.equal(false);
    expect(isTrue('truer')).to.equal(false);
    expect(isTrue('truthy')).to.equal(false);
    expect(isTrue('false')).to.equal(false);
    expect(isTrue('food')).to.equal(false);
  });
});
