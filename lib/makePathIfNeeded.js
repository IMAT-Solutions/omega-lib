const fs = require('fs');
const path = require('path');

function makePathIfNeeded(dstPath) {
  var parts, tempPath = '';
  if (dstPath[0] === '/' || dstPath[0] === '\\') {
    throw new Error('Root Path is not acceptable');
  }

  if (!fs.existsSync(dstPath)) {
    parts = dstPath.split(/[\/\\]/);
    //console.log("Folders:", parts);
    parts.forEach(part => {
      tempPath = path.join(tempPath, part);
      if (!fs.existsSync(tempPath)) {
        //console.log("Creating folder:", tempPath);
        fs.mkdirSync(tempPath);
      }
    });
  }
}

module.exports = makePathIfNeeded;
