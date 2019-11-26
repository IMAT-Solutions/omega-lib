# readDeepDirs

Get a list of all files in a folder and its sub folders.

## Library Function

This library function is located in `./lib/readDeepDirs.js`

## Function Signature

To use this function you pass in a string indicating the path you want to delete.

```js
<array of strings> readDeepDirs(srcPath <string>[, options <object>]);
```

## Usage

### Internal repo access

```js
const readDeepDirs = require('./lib/readDeepDirs');

const fileList = readDeepDirs('dist');
```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {readDeepDirs} = require('omegalib');
// or
const readDeepDirs = require('omegalib').readDeepDirs;
```

Using the example code above all files and sub folders from `dist` will be read and returned as an array of strings.

As an example if your project folder looked like this:

```
myApp
 ├─ myFile.js
 └─ dist
     ├─ css
     │   └─ main.css
     ├─ html
     │   ├─ container
     │   │   └─ other.html
     │   └─ myFile.html
     └─ js
         ├─ file1.js
         ├─ file2.js
         └─ file3.js
```

Then the call to `readDeepDirs('myApp') would return this list of files:

```
[
    "myFile.js",
    "dist/css/main.css",
    "dist/html/myFile.html",
    "dist/html/container/other.html",
    "dist/js/file1.js",
    "dist/js/file2.js",
    "dist/js/file3.js"
]
```

### Options

You can pass in a second parameter of any of the following options:

| Option         | Type                    | Default | Description                                                  |
| -------------- | ----------------------- | ------- | ------------------------------------------------------------ |
| filter         | RegExp                  | null    | A filter used to limit the names of the files returned. <br />_See `filter option` below._ |
| includeSrcPath | boolean                 | false   | The `srcPath` will be prepended to all files. In the example above, instead of `'myFile.js'` you would get back `'myApp/myFile.js'` |
| ignore         | string/array of strings | null    | A path or array of paths to ignore.                          |
| prependSlash   | boolean                 | false   | If `true` then all returned paths start with `'/'`           |
| stats          | boolean                 | false   | If `true` then return an array of `stat` objects instead of an array of path strings. |

#### filter option

The `filter` option allows you to limit the list of files that will be returned. `filter` is passed in as a `RegExp` value. As files are located they are compared to the filter and, if they match, they are added. Otherwise they are excluded.

If `filter` is `null` or `undefined` then all located files are included in the response.

**Example:**

Only include the files that end in `.html`, `.Html`, `.HTML`, etc.

```js
const files = readDeepDir('.', {filter: /\.html$/i})
```



>  If `filter` is a value other then `Regexp` then `readDeepDirs` will throw a `TypeError`.

---

## Updated History:

| Date       | Author       | Description                  |
| ---------- | ------------ | ---------------------------- |
| 2019-04-18 | Mike Collins | Added `filter` option.       |
| 2018-11-26 | Mike Collins | Moved to the Omega-Lib repo  |
| 2018-08-22 | Mike Collins | Cleaned up after Peer Review |
| 2018-08-13 | Mike Collins | Initial Draft                |