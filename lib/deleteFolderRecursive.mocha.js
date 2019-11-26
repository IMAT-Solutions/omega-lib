/* eslint-env mocha */
const path = require('path');
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();
const SUB_PATH_RE = /[\/\\]sub\d$/;
const BAD_PATH = path.resolve('bad').replace(/\\/g, '/');
const ROOT_PATH = path.resolve('root').replace(/\\/g, '/');
const SUB1_PATH = path.resolve('root/sub1').replace(/\\/g, '/');
const SUB2_PATH = path.resolve('root/sub1/sub2').replace(/\\/g, '/');
var loadData;
var failrm = false;
const fsStub = {
  existsSync(fname) {
    return fname !== BAD_PATH;
  },
  lstatSync(fname) {
    return {
      isDirectory() {
        return SUB_PATH_RE.test(fname);
      }
    };
  },
  readdirSync(fname) {
    var temp = fname.replace(/\\/g, '/');
    if (temp === ROOT_PATH) {
      return [
        'one.js',
        'two.html',
        'sub1'
      ];
    }

    if (temp === SUB1_PATH) {
      return [
        'additional.js',
        'sub2',
        'taco.html'
      ];
    }

    if (temp === SUB2_PATH) {
      return [
        'last.js'
      ];
    }

    return [];
  },
  rmdirSync(fname) {
    if (failrm && fname === ROOT_PATH) {
      var err = new Error(`ENOENT: no such file or directory, rmdir 'sub1'`);
      err.errno = -4058;
      err.syscall = "rmdir";
      err.code = "ENOENT";
      err.path = "sub1";
      throw err;
    }
    loadData.folders.push(fname.replace(/\\/g, '/'));
  },
  unlinkSync(fname) {
    loadData.files.push(fname.replace(/\\/g, '/'));
  }
};

const stubs = {
  'fs': fsStub
}
const deleteFolderRecursive = proxyquire('./deleteFolderRecursive', stubs);

const fixPath = fArray => fArray.map(item => path.resolve(item).replace(/\\/g, '/'));

describe('tests for lib/deleteFolderRecursive.js', () => {
  beforeEach(() => {
    failrm = false;
    loadData = {
      files: [],
      folders: []
    };
  });

  it('should init', () => {
    expect(deleteFolderRecursive).to.be.a('function');
  });

  it('should remove all files', () => {
    deleteFolderRecursive('root');
    expect(loadData.files).to.eql(fixPath(['root/one.js','root/two.html','root/sub1/additional.js','root/sub1/sub2/last.js','root/sub1/taco.html']));
    expect(loadData.folders).to.eql(fixPath(['root/sub1/sub2','root/sub1','root']));
  });

  it('should do nothing on bad folder', () => {
    deleteFolderRecursive('bad');
    expect(loadData.files).to.eql([]);
    expect(loadData.folders).to.eql([]);
  });

  it('should remove all files even if unable to remove folder', () => {
    failrm = true;
    deleteFolderRecursive('root');
    expect(loadData.files).to.eql(fixPath(['root/one.js','root/two.html','root/sub1/additional.js','root/sub1/sub2/last.js','root/sub1/taco.html']));
    expect(loadData.folders).to.eql(fixPath(['root/sub1/sub2','root/sub1']));
  });

  it('should throw on no string', () => {
    function doit() {
      deleteFolderRecursive();
    }

    expect(doit).to.throw();
  });

  it('should throw on attempting to remove root folder', () => {
    function doit1() {
      deleteFolderRecursive('/');
    }
    function doit2() {
      deleteFolderRecursive('\\');
    }
    function doit3() {
      deleteFolderRecursive('F:\\');
    }
    function doit4() {
      deleteFolderRecursive('z:/');
    }
    function doit5() {
      deleteFolderRecursive('../../../../../../../../../../../../../../../../../../../../../../../..');
    }

    expect(doit1).to.throw();
    expect(doit5).to.throw();

    if (process.platform.substr(0,3) === "win") {
      expect(doit2).to.throw();
      expect(doit3).to.throw();
      expect(doit4).to.throw();
    }
  });
});
