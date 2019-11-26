const fs = require('fs');

function dateAndSize(file1, file2) {
  let retVal;
  //console.log(`comparing files ${file1} --> ${file2}`);

  try {
    let stat1 = fs.statSync(file1);
    let stat2 = fs.statSync(file2);

    //console.log(stat1.size, stat1.mtimeMs, file1);
    //console.log(stat2.size, stat2.mtimeMs, file2);

    retVal = (stat1.size === stat2.size && stat1.mtimeMs <= stat2.mtimeMs );
  }

  catch(ex) {
    //console.log(ex.stack);
    retVal = false;
  }

  return retVal;
}

function isNewer(srcFile, dstFile) {
  let retVal = true;

  if (fs.existsSync(dstFile)) {
    try {
      let stat1 = fs.statSync(srcFile);
      let stat2 = fs.statSync(dstFile);

      retVal = stat1.mtimeMs > stat2.mtimeMs;
    }

    catch(ex) {
      //console.log(ex.stack);
      retVal = false;
    }
  }


  return retVal;
}

module.exports = {
  dateAndSize,
  isNewer
};
