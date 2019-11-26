const debug = require('debug')('Omegalib:removeFiles');
const fs = require('fs');
const getFileArrayFromGlob = require('./getFileArrayFromGlob');

function removeFiles(fileList) {
  var cnt = 0;
  getFileArrayFromGlob(process.cwd(), fileList).forEach(fname => {
    try {
      if (fs.existsSync(fname)) {
        fs.unlinkSync(fname);
        cnt++;
      }
    }

    catch(ex) {
      debug(ex.stack);
    }
  });

  return cnt;
}

module.exports = removeFiles;
