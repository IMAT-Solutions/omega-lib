/* eslint-env mocha */
const {expect} = require('chai');
const proxyquire = require('proxyquire').noCallThru();
// More info on `peoxyquire`:
// https://github.com/thlorenz/proxyquire#readme
var loadData, pathsExist;

const fsMock = {
  existsSync(folder) {
    var f = folder.replace(/\\/g, '/');
    loadData.exists.push(f);
    return pathsExist.includes(f);
  },
  mkdirSync(folder) {
    var f = folder.replace(/\\/g, '/');
    loadData.mkdir.push(f);
    pathsExist.push(f);
  }
}
const mocks = {
  'fs': fsMock
};

const makePathIfNeeded = proxyquire('./makePathIfNeeded', mocks);

describe('tests for lib/makePathIfNeeded.js', function() {
  beforeEach(() => {
    pathsExist = [];
    loadData = {
      exists: [],
      mkdir: []
    };
  });

  afterEach(() => {
  });

  it('should be a function', function() {
    expect(makePathIfNeeded).to.be.a('function');
  });

  it('should throw with a root path', function() {
    function doit() {
      makePathIfNeeded('/root');
    }

    expect(doit).to.throw(Error);
  });

  it('should do nothing with existing path', function() {
    pathsExist = ['root'];
    makePathIfNeeded('root');
    expect(loadData.exists.length).to.equal(1);
    expect(loadData.exists[0]).to.equal('root');
    expect(loadData.mkdir.length).to.equal(0);
  });

  it('should create a single path', function() {
    pathsExist = ['root'];
    makePathIfNeeded('root/dogs');
    expect(loadData.exists.length).to.equal(3);
    expect(loadData.exists[0]).to.equal('root/dogs');
    expect(loadData.exists[1]).to.equal('root');
    expect(loadData.exists[2]).to.match(/root[\\\/]dogs/);
    expect(loadData.mkdir.length).to.equal(1);
    expect(loadData.mkdir[0]).to.match(/root[\\\/]dogs/);
  });

  it('should create a deep path', function() {
    pathsExist = ['one','one/two','one/two/3'];
    makePathIfNeeded('one/two/3/four/5/six');
    expect(loadData.exists.length).to.equal(7);
    expect(loadData.exists[0]).to.equal('one/two/3/four/5/six');
    expect(loadData.exists[1]).to.equal('one');
    expect(loadData.exists[2]).to.equal('one/two');
    expect(loadData.exists[3]).to.equal('one/two/3');
    expect(loadData.exists[4]).to.equal('one/two/3/four');
    expect(loadData.exists[5]).to.equal('one/two/3/four/5');
    expect(loadData.exists[6]).to.equal('one/two/3/four/5/six');
    expect(loadData.mkdir.length).to.equal(3);
    expect(loadData.mkdir[0]).to.equal('one/two/3/four');
    expect(loadData.mkdir[1]).to.equal('one/two/3/four/5');
    expect(loadData.mkdir[2]).to.equal('one/two/3/four/5/six');
  });
});
