/* eslint-env mocha */
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();
const stubs = {
  fs: {
    existsSync: (fname) => fname !== 'bad',
    readFileSync: () => '{"name":"Fred","age":23}'
  }
}
const loadJsonFile = proxyquire('./loadJsonFile', stubs);

describe('tests for lib/loadJsonFile.js', function() {
  it('should init', function() {
    expect(loadJsonFile).to.be.a('function');
  });

  it('should process none existant file', function() {
    var a = loadJsonFile('bad');
    expect(a).to.equal(null);
  });

  it('should process none existant file', function() {
    var a = loadJsonFile('good');
    expect(a).to.eql({name:"Fred",age:23});
  });
});
