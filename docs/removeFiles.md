# removeFiles

Remove a set of files based on the passed in globby string or array of globby strings. The strings can contain an absolute path or a relative path.

## Library Function

This library function is located in `./lib/removeFiles.js`

## Function Signatures

To use this function you pass in a globby string or an array of globby strings. The function will delete only the files specified. It does not delete any folders.

```js
removeFiles(files <string | array or string>);
```

## Usage

### Internal repo access

```js
const removeFiles = requre('./lib/removeFiles');

removeFiles(['dist/**/*','deploy/**/*']);
```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const { removeFiles } = require('omegalib');
// or
const removeFiles = require('omegalib').removeFiles;
```

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to Omega-Lib repo |
| 2018-09-25 | Mike Collins | Initial Draft |
