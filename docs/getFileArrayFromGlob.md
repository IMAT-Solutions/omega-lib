# getFileArrayFromGlob

Get a list of relative file paths that are found using an array of globby paths.


## Library Function

This library function is located in `./lib/getFileArrayFromGlob.js`

## Function Signature

To use this function you pass in either a single string or an array of strings that contains the list of globby file names to look for.

```js
<array of strings> getFileArrayFromGlob(rootFolder <string>, globPath <string>);

<array of strings> getFileArrayFromGlob(rootFolder <string>, globPath <array of string>);
```

> If no files match the `globPath` then an empty array is returned.

## Usage

### Internal repo access

expect(resJsonCalled).to.equal(1);

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {getFileArrayFromGlob} = require('omegalib');
// or
const getFileArrayFromGlob = require('omegalib').getFileArrayFromGlob;
```

### Example

Assuming you have this file layout:

```
src
 ├─ css
 │   └─ main.css
 ├─ html
 │   ├─ container
 │   │   └─ other.html
 │   └─ myFile.html
 └─ js
     ├─ utils
     │   └─ files.js
     ├─ item1.js
     ├─ item2.js
     └─ item3.js
```

Then this code,

```js
const getFileArrayFromGlob = require('./lib/getFileArrayFromGlob');
var files = getFileArrayFromGlob(process.cwd(), 'src/**/*.js');

```

would produce the following value for `files:`

```json
[
  "src/js/utils/files.js",
  "src/js/file1.js",
  "src/js/file2.js",
  "src/js/file3.js"
]
```

> Again, if you use an absolute path you risk the path not existing on another machine. **Avoid them.**

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to Omega-Lib repo. |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-13 | Mike Collins | Initial Draft |
