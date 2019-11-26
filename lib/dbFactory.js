const Mysql = require('./dbFactory/Mysql');

const TYPES = {
  MYSQL: "MYSQL"
};

function dbFactory(dbType, options) {
  switch(dbType.toUpperCase()) {
    case TYPES.MYSQL: {
      return new Mysql(options);
    }

    // TODO: Provide additional Database types here as needed

    default: {
      throw new TypeError(`Unable to return DB object. The dbType '${dbType}' is not valid.`)
    }
  }
}

module.exports = dbFactory;
module.exports.TYPES = TYPES;
