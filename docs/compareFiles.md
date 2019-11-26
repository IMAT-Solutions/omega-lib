# compareFiles

Compare two files by date and size or check to see if one file is newer than another.

## Library Function

This library function is located in `./lib/compareFiles.js`

## Function Signature

To use this function you pass in a string indicating the path you want to delete.

```js
compareFiles.dateAndSize(file1Path <string>, file2Path <string>);
compareFiles.isNewer(file1Path <string>, file2Path <string>);
```

## Usage

### Internal repo access

```js
const compareFiles = require('./lib/compareFiles');
compareFiles.dateAndSize(file1Path <string>, file2Path <string>);
compareFiles.isNewer(file1Path <string>, file2Path <string>);
// or
const {dateAndSize, isNewer} = require('./lib/compareFiles');
dateAndSize(file1Path <string>, file2Path <string>);
isNewer(file1Path <string>, file2Path <string>);
```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {compareFiles} = require('omegalib');
// or
const compareFiles = require('omegalib').compareFiles;
```

## Updated History:

| Date       | Author       | Description   |
| ---------- | ------------ | ------------- |
| 2018-11-26 | Mike Collins | Initial Draft |