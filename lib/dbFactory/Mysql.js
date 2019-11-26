// https://www.npmjs.com/package/mysql#community
const debug = require('debug')('Omegalib:dbFactory:Mysql');
const mysql = require('mysql');

function connect(db) {
  if (!db.connection) {
    db.connection = mysql.createConnection(db._config);
  }

  if (!db._connected) {
    db.connection.connect();
    debug('Connecting to DB');
    db._connected = true;
  }
}

class Mysql {
  constructor(config) {
    this._config = config;
    this._connected = false;
    this.connection = null;
    Object.defineProperties(this, {
      escape: { value: mysql.escape },
      escapeId: { value: mysql.escapeId },
      format: { value: mysql.format },
      raw: { value: mysql.raw }
    });
  }

  close() {
    if (this._connected) {
      debug('Disconnecting from DB');
      this.connection.end();
      this._connected = false;
    }

    if (this.connection) {
      this.connection = null;
    }
  }

  insert(sql, params) {
    return new Promise(
      (resolve, reject) => {
        connect(this);
        this.connection.query(sql, params, (error, results) => {
          if (error) {
            reject(error);
          }
          else {
            resolve(results.insertId);
          }
        });
      }
    );
  }

  query(sql, params) {
    return new Promise(
      (resolve, reject) => {
        connect(this);
        this.connection.query(sql, params, (error, results) => {
          if (error) {
            reject(error);
          }
          else {
            resolve(results);
          }
        });
      }
    );
  }
}

module.exports = Mysql;
