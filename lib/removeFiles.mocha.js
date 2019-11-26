/* eslint-env mocha */
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();

let existsList;
let unlinkList;
const existsSyncStub = (fname) => {
  return existsList.includes(fname);
};

const unlinkSyncStub = (fname) => {
  if (fname === 'die') {
    throw new Error('I would like to die on Mars. Just not on impact.');
  }
  unlinkList.push(fname);
}

const getFileArrayFromGlobStub = () => {
  return [...existsList, 'dogs/cats.js'];
}

const stubs = {
  'fs': {
    existsSync: existsSyncStub,
    unlinkSync: unlinkSyncStub
  },
  './getFileArrayFromGlob': getFileArrayFromGlobStub
};

const removeFiles = proxyquire('./removeFiles', stubs);

describe('tests for lib/removeFiles.js', function() {
  afterEach(() => {
  });

  beforeEach(() => {
    existsList = [];
    unlinkList = [];
  });

  it('should init', function() {
    expect(removeFiles).to.be.a('function');
  });

  it('should not delete files when there are none', function() {
    var cnt = removeFiles('');
    expect(cnt).to.equal(0);
  });

  it('should delete existing files', function() {
    existsList = ['fish.js', 'frog/big.js', 'fast-food/tacos/are/great.css'];
    var cnt = removeFiles('');
    expect(cnt).to.equal(3);
    expect(unlinkList).to.eql(existsList);
  });


  it('should properly handle exception', function() {
    existsList = ['fish.js', 'frog/big.js', 'die'];
    var cnt = removeFiles('');
    expect(cnt).to.equal(2);
    expect(unlinkList).to.eql(existsList.slice(0,2));
  });
});
