# Omega Library functions

[Omega-Lib](https://github.com/IMAT-Solutions/omega-lib) is a set of library functions used by both the [Omega](https://github.com/IMAT-Solutions/omega) and [Omega-Tools](https://github.com/IMAT-Solutions/omega-tools) repos.

We will try to keep Omega-Lib compatible with both the [current release](https://nodejs.org/en/download/current/) and the [Active LTS release of Node.js](https://nodejs.org/en/download/).

> As of February 19, 2019 we recommend using Node version 10.x. *Use, at least, version 10.13.0.*

## Install

### Clone the Repo

If you want to dig into the code for omega-lib then you can clone the Omega-Lib repo:

```
git clone https://github.com/IMAT-Solutions/omega-lib.git omegalib
```

### Install Omega-Lib

If you want to use Omega-Lib in your project then add it to your `package.json` by running the following command:

```
npm install --save git+https://github.com/IMAT-Solutions/omega.git
```

### Library Functions

Omega-Lib exposes several functions that can be used in your Node.js code. In your source file you would include Omega-lib by using `require`:

```js
const omegalib = require('@imat/omegalib');
```

Then you use one of the exported functions like this:

```js
const jsonData = omegalib.loadJsonFile('filename');
if (omegalib.endsInSlash('/my/folder/')) {
  // Do something.
}
```



#### List of functions

- [compareFiles](docs/compareFiles.md) - Compare two files by date and size or check to see if one file is newer than another.
- [deleteFolderRecursive](docs/deleteFolderRecursive.md) - Delete all files in a folder and all of it's sub folders
- [endsInSlash](docs/endsInSlash.md) - Check to see if a string ends in either `'/'` or `'\'`
- [getFileArrayFromGlob](docs/getFileArrayFromGlob.md) - Get a list of files based on a list of globby file names
- [loadJsonFile](docs/loadJsonFile.md) - Load a JSON file and convert it to a JS object.
- [makePathIfNeeded](docs/makePathIfNeeded.md) - Make a path and its parents if they are needed.
- [readDeepDirs](docs/readDeepDirs.md) - Get a list of all files in a folder and its sub folders.
- [removeFiles](docs/removeFiles.md) - Remove a set of files based on the passed in globby string or array of globby strings.
- [utils](docs/utils.md) - A set us useful utility functions.

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2019-05-30 | Jeremy Workman | Version 2.0.4<br/>* Removed access to package.json version on module |
| 2019-05-29 | Jeremy Workman | Version 2.0.3<br/>* Added access to package.json version on module |
| 2019-04-19 | Mike Collins | Version 2.0.2<br/>* Updated readDeepDirs to include a filter |
| 2019-02-21 | Mike Collins | * Updated links<br/>* Updated name for `require`<br />* Cleaned up spelling errors and grammar<br/>* Updated to latest versions of `debug`, `eslint` and `nyc`<br/>* Removed `node-watch` which was not being used<br/>* Converted `console.log` to `debug` commands. |
| 2018-11-26 | Mike Collins | Initial Draft |
