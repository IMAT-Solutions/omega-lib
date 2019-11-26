/* eslint-env mocha */
const path = require('path').posix;
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();

class Stats {
  constructor(fname) {
    this.fname = fname;
  }

  isDirectory() {
    return path.extname(this.fname) === '';
  }
}

const folders = {
  '.': [
    'top'
  ],
  'top': [
    'abcdef.gh',
    'animals',
    'dogs and cats.js',
    'foods',
    'hot.potato',
    'ignore',
    'xanadu.mp4'
  ],
  'top/animals': [
    'cow.txt',
    'dog.css',
    'fish.html',
    'goose.egg'
  ],
  'top/foods': [
    'fruit',
    'vegatables'
  ],
  'top/foods/fruit': [
    'apple.js',
    'peach.js',
    'watermelon.js'
  ],
  'top/foods/vegatables': [
    'carrot.css',
    'eggplant.css',
    'green.beans',
    'zucchini.css',
    'zucchini.css.bak'
  ],
  'top/ignore': [
    'one',
    'two'
  ],
  'top/ignore/one': [
    'a'
  ],
  'top/ignore/one/a': [
    'b'
  ],
  'top/ignore/one/a/b': [
    'c'
  ],
  'top/ignore/one/a/b/c': [
    'bad file.js'
  ]
};

const fullList = [
  '/top/abcdef.gh',
  '/top/dogs and cats.js',
  '/top/hot.potato',
  '/top/xanadu.mp4',
  '/top/animals/cow.txt',
  '/top/animals/dog.css',
  '/top/animals/fish.html',
  '/top/animals/goose.egg',
  '/top/foods/fruit/apple.js',
  '/top/foods/fruit/peach.js',
  '/top/foods/fruit/watermelon.js',
  '/top/foods/vegatables/carrot.css',
  '/top/foods/vegatables/eggplant.css',
  '/top/foods/vegatables/green.beans',
  '/top/foods/vegatables/zucchini.css',
  '/top/foods/vegatables/zucchini.css.bak',
  '/top/ignore/one/a/b/c/bad file.js'
].sort();

const filterRe = /.css$/i;

const filteredList = fullList.filter(fname => filterRe.test(fname));

const fsStub = {
  readdirSync: (fname) => {
    return folders[fname] || [];
  },
  statSync: (fname) => {
    return new Stats(fname);
  }
};

const stubs = {
  'fs': fsStub
};

const readDeepDirs = proxyquire('./readDeepDirs', stubs);

describe('tests for lib/readDeepDirs.js', function() {
  let realChdir;
  let realCwd;

  afterEach(() => {
    process.chdir = realChdir;
    process.cwd = realCwd;
  });

  beforeEach(() => {
    realChdir = process.chdir;
    realCwd = process.cwd;
  });
  it('should init', function() {
    expect(readDeepDirs).to.be.a('function');
  });

  it('should handle full list', function() {
    const list = readDeepDirs('/');
    expect(list).to.eql(fullList);
  });

  it('should handle full list - no prepend', function() {
    const list = readDeepDirs('/', {prependSlash:false});
    const temp = fullList.map(item => item.substr(1));
    expect(list).to.eql(temp);
  });

  it('should handle full list - full path', function() {
    const rootPath = '/testing';
    process.cwd = () => rootPath;
    process.chdir = () => {};
    const list = readDeepDirs('testing', {includeSrcPath: true});
    const temp = fullList.map(item => path.join(rootPath, item.substr(1)));
    expect(list).to.eql(temp);
  });

  it('should handle full list - with ignore', function() {
    process.cwd = () => '/';
    process.chdir = () => {};
    const list = readDeepDirs('', {ignore: 'ignore'});
    const temp = fullList.filter(item => !item.includes('ignore'));
    expect(list).to.eql(temp);
  });

  it('should handle full list - with ignore', function() {
    process.cwd = () => '/';
    process.chdir = () => {};
    const list = readDeepDirs('', {ignore: ['ignore', 'fruit']});
    const temp = fullList.filter(item => !(item.includes('ignore')||item.includes('fruit')));
    expect(list).to.eql(temp);
  });

  it('should handle full list - with stats', function() {
    process.cwd = () => '/';
    process.chdir = () => {};
    const list = readDeepDirs('', {stats: true});
    const temp = fullList.map(item => ({path: item, fname: item.substr(1)}));
    expect(list).to.eql(temp);
  });

  it('should handle filtered list', function() {
    const list = readDeepDirs('/', {filter: filterRe});
    expect(list).to.eql(filteredList);
  });

  it('should handle bad filter', function(done) {
    try {
      readDeepDirs('/', {filter: 10});
      return done('Should have thrown an error and did not');
    }

    catch(ex) {
      expect(ex).to.be.instanceof(TypeError);
      expect(ex.message).to.equal('options.filter must be a RegExp');
      done();
    }
  });
});
