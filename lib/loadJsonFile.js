const fs = require('fs');

module.exports = fname => ((fs.existsSync(fname)) ? JSON.parse(fs.readFileSync(fname, {'encoding':'utf8'})):null);
