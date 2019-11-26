/* eslint-env mocha */
const expect = require('chai').expect;
const proxyquire = require('proxyquire').noCallThru();
let err = null;
let res = null;
let test = {
  connectCalled: 0,
  config: null,
  endCalled: 0,
  query: [],
  queryCalled: 0
};

class MockConnection {
  constructor(config) {
    test.config = config;
  }
  connect() {
    test.connectCalled++;
  }
  end() {
    test.endCalled++;
  }
  query(sql, params, cb/*(error, results) => {*/) {
    test.queryCalled++;
    test.query.push({sql,params});

    setTimeout(() => {
      cb(err, res);
    },0);
  }
}
const stubs = {
  mysql: {
    createConnection(config) {
      return new MockConnection(config);
    },
    raw: null // TODO: Add mock code here
  }
}
const Mysql = proxyquire('./Mysql', stubs);

describe('tests for lib/dbFactory/Mysql.js', () => {
  beforeEach(() => {
    err = null;
    res = null;
  })

  it('should init', () => {
    expect(Mysql).to.be.a('function');
  });

  it('should return an object', () => {
    var db = new Mysql(10);
    expect(db).to.be.a('object');
    expect(db.connection).to.equal(null);
  });

  it('should not crash with double connection', () => {
    var db = new Mysql(10);
    db.query();
    expect(test.connectCalled).to.equal(1);
    db.query();
    expect(test.connectCalled).to.equal(1);
  });

  it('should not crash when calling close before using connection', () => {
    var db = new Mysql(10);
    db.close();
    expect(db.connection).to.equal(null);
  });

  describe('test query', () => {
    it('should return an object', done => {
      var db = new Mysql(10);
      res = [{animal: 'dog', sound:'woof', legs: 4}];
      db.query('SQL', [1,2,3]).then(
        data => {
          expect(data).to.eql(res);
          db.close();
          done();
        },
        error => {
          db.close();
          done(error);
        }
      ).catch(
        ex => {
          db.close();
          done(ex);
        }
      )
    });

    it('should return an error', done => {
      var db = new Mysql(10);
      err = {error: true};
      db.query('SQL', [1,2,3]).then(
        data => { // eslint-disable-line no-unused-vars
          db.close();
          done('Should have returned an error');
        },
        error => {
          db.close();
          expect(error).to.eql(err);
          done();
        }
      ).catch(
        ex => {
          db.close();
          done(ex);
        }
      )
    });
  });

  describe('test insert', () => {
    it('should return an object', done => {
      var db = new Mysql(10);
      res = {insertId: 4};
      db.insert('SQL', [1,2,3]).then(
        data => {
          expect(data).to.eql(4);
          db.close();
          done();
        },
        error => {
          db.close();
          done(error);
        }
      ).catch(
        ex => {
          db.close();
          done(ex);
        }
      )
    });

    it('should return an error', done => {
      var db = new Mysql(10);
      err = {error: true};
      db.insert('SQL', [1,2,3]).then(
        data => { // eslint-disable-line no-unused-vars
          db.close();
          done('Should have returned an error');
        },
        error => {
          db.close();
          expect(error).to.eql(err);
          done();
        }
      ).catch(
        ex => {
          db.close();
          done(ex);
        }
      )
    });
  });
});
