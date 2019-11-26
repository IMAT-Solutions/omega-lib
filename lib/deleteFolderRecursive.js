const fs = require('fs');
const path = require('path');
const ROOT_RE = /^([A-Z]\:[\\\/]|[\\\/])$/i;

function deleteFolderRecursive(folder) {
  if (typeof folder !== 'string') {
    throw new Error('`folder` must be a string.');
  }

  var resolvedFolder = path.resolve(folder).replace(/\\/g, '/'); // Check to see if they are trying to get to the root path

  if (ROOT_RE.test(resolvedFolder)) {
    throw new Error('You can not remove the root folder.');
  }

  if (fs.existsSync(resolvedFolder)) {
    fs.readdirSync(resolvedFolder).forEach(file => {
      var curPath = path.join(resolvedFolder, file).replace(/\\/g, '/');
      try {
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolderRecursive(curPath);
        }
        else {
          // delete file
          fs.unlinkSync(curPath);
        }
      }

      catch(ex) {
        // Nothing to do. We will just leave the empty folder
      }
    });

    try {
      fs.rmdirSync(resolvedFolder);
      //console.log('folder:', resolvedFolder);
    }

    catch(ex) {
      // Nothing to do. We will just leave the empty folder
    }
  }
}

module.exports = deleteFolderRecursive;
