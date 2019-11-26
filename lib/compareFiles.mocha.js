/* eslint-env mocha */
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();

let statsList;
const existsSyncStub = (fname) => {
  return !!statsList[fname];
};

const statSyncStub = (fname) => {
  return statsList[fname];
}

const stubs = {
  'fs': {
    existsSync: existsSyncStub,
    statSync: statSyncStub
  }
};

const compareFiles = proxyquire('./compareFiles', stubs);

describe('tests for lib/compareFiles.js', function() {
  afterEach(() => {
  });

  beforeEach(() => {
    statsList = {};
  });

  it('should init', function() {
    expect(compareFiles).to.be.an('object');
    expect(compareFiles.dateAndSize).to.be.a('function');
    expect(compareFiles.isNewer).to.be.a('function');
  });

  describe('test function dateAndSize', function() {
    it('should handle existing files - same size, file1 older than file2', function() {
      statsList.file1 = {size: 1000, mtimeMs: 1234};
      statsList.file2 = {size: 1000, mtimeMs: 1235};
      expect(compareFiles.dateAndSize('file1', 'file2')).to.equal(true);
    });

    it('should handle existing files - same size, file1 newer than file2', function() {
      statsList.file1 = {size: 1000, mtimeMs: 1235};
      statsList.file2 = {size: 1000, mtimeMs: 1234};
      expect(compareFiles.dateAndSize('file1', 'file2')).to.equal(false);
    });

    it('should handle existing files - different sizes', function() {
      statsList.file1 = {size: 1001, mtimeMs: 1234};
      statsList.file2 = {size: 1000, mtimeMs: 1234};
      expect(compareFiles.dateAndSize('file1', 'file2')).to.equal(false);
    });

    it('should handle missing file2', function() {
      statsList.file1 = {size: 1001, mtimeMs: 1234};
      expect(compareFiles.dateAndSize('file1', 'file2')).to.equal(false);
    });
  });

  describe('test function isNewer', function() {
    it('should handle existing files - file1 older than file2', function() {
      statsList.file1 = {mtimeMs: 1234};
      statsList.file2 = {mtimeMs: 1235};
      expect(compareFiles.isNewer('file1', 'file2')).to.equal(false);
    });

    it('should handle existing files - file1 newer than file2', function() {
      statsList.file1 = {mtimeMs: 1235};
      statsList.file2 = {mtimeMs: 1234};
      expect(compareFiles.isNewer('file1', 'file2')).to.equal(true);
    });

    it('should handle missing file1', function() {
      statsList.file2 = {mtimeMs: 1234};
      expect(compareFiles.isNewer('file1', 'file2')).to.equal(false);
    });

    it('should handle missing file2', function() {
      statsList.file1 = {mtimeMs: 1234};
      expect(compareFiles.isNewer('file1', 'file2')).to.equal(true);
    });
  });
});
