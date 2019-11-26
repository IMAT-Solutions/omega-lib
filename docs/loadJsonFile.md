# loadJsonFile

Load a JSON formatted file and return the results as a JavaScript object.


## Library Function

This library function is located in `./lib/loadJsonFile.js`

## Function Signature

To use this function you pass in a single string that contains the path to the JSON file.

```js
<object> loadJsonFile(filePath <string>);
```

## Usage

### Internal repo access

```js
const loadJsonFile = require('./lib/loadJsonFile');
var obj = loadJsonFile('/json/test.json');

```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {loadJsonFile} = require('omegalib');
// or
const loadJsonFile = require('omegalib').loadJsonFile;
```

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to the Omega-Lib repo |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-17 | Mike Collins | Initial Draft |
