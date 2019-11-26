# deleteFolderRecursive

Delete all files in a folder and its sub folders.

## Library Function

This library function is located in `./lib/deleteFolderRecursive.js`

## Function Signature

To use this function you pass in a string indicating the path you want to delete.

```js
deleteFolderRecursive(path <string>);
```


## Usage

### Internal repo access

```js
const deleteFolderRecursive = require('./lib/deleteFolderRecursive');

deleteFolderRecursive('dist');
```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {deleteFolderRecursive} = require('omegalib');
// or
const deleteFolderRecursive = require('omegalib').deleteFolderRecursive;
```

Using the example code above all files and sub folders from `dist` will be deleted.


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

Then, after the call to `deleteFolderRecursive('dist')`, the project folder would look like this:

```
myApp
 └─ myFile.js
```

### Exceptions

You can not attempt to delete the root folder of a drive. The following examples will all throw an exception:

```js
deleteFolderRecursive('/');
deleteFolderRecursive('\\');
deleteFolderRecursive('C:\\');
deleteFolderRecursive('F:/');
deleteFolderRecursive('../../../../../../../../../../../../../..');
```

> You can not do anything to try to get to the root folder. `deleteFolderRecursive` will not allow the root folder to be removed.

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to the Omega-Lib repo |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-13 | Mike Collins | Initial Draft |
