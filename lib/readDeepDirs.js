const fs = require('fs');
const path = require('path').posix;

function shouldExclude(file, ignore) {
  return ignore.some(
    folder => {
      let re = new RegExp(`^(.*\/)*${folder}$`);
      return re.test(file);
    }
  );
}

function readDeepDirs(root, options = {}) {
  var cwd = process.cwd();
  process.chdir(root);

  let ignore = options.ignore;
  if (ignore) {
    if (!Array.isArray(ignore)) {
      ignore = [ignore];
    }

    ignore = ignore.map(folder => folder.replace(/\\/g, '/'));
  }

  if (options.filter && !(options.filter instanceof RegExp)) {
    throw new TypeError('options.filter must be a RegExp');
  }

  root = root.replace(/\\/g, '/'); // eslint-disable-line no-param-reassign
  while (root.slice(-1) === '/') {
    root = root.slice(0,-1); // eslint-disable-line no-param-reassign
  }

  function readDeep(folder) {
    const files = fs.readdirSync(folder);
    return files.reduce(
      (list, fname) => {
        var file = path.join(folder, fname);
        var stat = fs.statSync(file);
        // TODO: Maybe change to lstatSync
        // Need to prevent an endless dive of symlinks
        if (stat.isDirectory()) {
          if (!ignore || !shouldExclude(file, ignore)) {
            list = list.concat(readDeep(file)); // eslint-disable-line no-param-reassign
          }
        }
        else if (!options.filter || options.filter.test(file)) {

          if (options.includeSrcPath) {
            file = path.join(root, file);
          }

          if (options.prependSlash !== false) {
            file = '/'+file;
          }


          if (options.stats) {
            stat.path = file;
            list.push(stat);
          }
          else {
            list.push(file);
          }
        }

        return list;
      }, []
    );
  }


  let retVal = readDeep('.');
  process.chdir(cwd);
  return retVal;
}

module.exports = readDeepDirs;
