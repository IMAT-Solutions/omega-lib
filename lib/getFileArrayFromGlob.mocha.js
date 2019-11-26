/* eslint-env mocha */
const path = require('path');
const expect = require('chai').expect;
const getFileArrayFromGlob = require('./getFileArrayFromGlob');
const allFiles = [
  "a.js",
  "one/eee.html",
  "one/eee.js",
  "one/qqq.html",
  "one/qqq.js",
  "one/www.js",
  "three/a1.js",
  "three/a2.html",
  "three/a2.js",
  "three/a3.html",
  "three/a3.js",
  "two/a.js",
  "two/b.js",
  "two/c.js"
];
const htmlFiles = [
  "one/eee.html",
  "one/qqq.html",
  "three/a2.html",
  "three/a3.html"
];

describe('tests for lib/getFileArrayFromGlob.js', function() {
  beforeEach(() => {
  });

  it('should init', function() {
    expect(getFileArrayFromGlob).to.be.a('function');
  });

  it('should find all files', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, '**/*.*');
    expect(files.sort()).to.eql(allFiles);
  });

  it('should find one file', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, '*.*');
    expect(files.length).to.equal(1);
    expect(files[0]).to.equal('a.js');
  });

  it('should find all html file', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, ['**/*.html']);
    expect(files.sort()).to.eql(htmlFiles);
  });

  it('should find all files from array of globs', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, ['**/*.html', '**/*.js']);
    expect(files.sort()).to.eql(allFiles);
  });

  it('should work with non-glob name', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, 'dog.html');
    expect(files.length).to.equal(1);
    expect(files[0]).to.equal('dog.html');
  });

  it('should handle exclude item', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, ['**/*', '!two/**']);
    expect(files.length).to.equal(13);
    const temp = allFiles.filter(item => !item.includes('two'));
    temp.push('one');
    temp.push('three');
    expect(files).to.eql(temp.sort());
  });

  it('should handle ignore list', function() {
    const cwd = path.join(process.cwd(), 'test/globTests');
    var files = getFileArrayFromGlob(cwd, '**/*', {ignore:'three/**'});
    expect(files.length).to.equal(11);
    const temp = allFiles.filter(item => !item.includes('three'));
    temp.push('one');
    temp.push('two');
    expect(files).to.eql(temp.sort());
  });
});
