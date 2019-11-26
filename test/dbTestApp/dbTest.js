const Mysql = require('../../lib/dbFactory/Mysql.js');
//const options = {host: '10.10.10.51',user: 'dev',password: 'devPassword123',database: 'skunkworks_dev'};
const options = {host: '10.10.9.239',user: 'mcollins',password: 'PasswordSuckAndHateNeedingToUseThem',database: 'psa_appliance'};

var db = new Mysql(options);

const add = process.argv.some(arg => arg === '-a');
const drop = process.argv.some(arg => arg === '-d');
const read = process.argv.some(arg => arg === '-r');

if (drop) {
  dropTable().finally(() => db.close());
}
else if(read) {
  readTable().finally(() => db.close());
}
else if (add) {
  addToTable().finally(() => db.close());
}
else {
  console.log('===============================================');
  db.query('show tables').then(data => {
    console.log(JSON.stringify(data, 0, 2));
    const areUserPrefsFound = data.some(obj => obj.Tables_in_psa_appliance === 'user_prefs')
    return (!areUserPrefsFound) ? createTable() : addToTable();
  }).catch(
    err => {
      console.log(err);
    }
  ).finally(() => db.close());
}

function createTable() {
  console.log('Creating Preferences table');
  return db.query(`CREATE TABLE user_prefs (
  id int unsigned NOT NULL AUTO_INCREMENT,
  user int NOT NULL,
  pref varchar(64) NOT NULL,
  jsondata longtext,
  modified timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY id (id),
  UNIQUE KEY id_UNIQUE (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8`).then(data => console.log(JSON.stringify(data, 0, 2))).catch(ex => console.log(ex));
}

function dropTable() {
  console.log('Dropping Preferences table');
  return db.query(`DROP TABLE user_prefs;`).then(data => console.log(JSON.stringify(data, 0, 2))).catch(ex => console.log(ex));
}

function addToTable() {
  console.log('Inserting Preferences table');
//  return db.insert(`INSERT INTO user_prefs SET ?`, {user: 'taco', provider: 'default', pref: 'mine', jsondata: '{"this":"that","dogs":0}'}).then(data => console.log(JSON.stringify(data, 0, 2))).catch(ex => console.log(ex));
  return db.insert(`INSERT INTO user_prefs SET ?`, {user: 'taco', provider: 'default', pref: 'cat', jsondata: '"meow"'}).then(data => console.log(JSON.stringify(data, 0, 2))).catch(ex => console.log(ex));
}

function readTable() {
  console.log('Reading Preferences table');
  return db.query(`SELECT * FROM user_prefs`).then(data => console.log(JSON.stringify(data, 0, 2))).catch(ex => console.log(ex));
}
