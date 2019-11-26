# makePathIfNeeded

Create a set of paths if they don't exist.

## Library Function

This library function is located in `./lib/makePathIfNeeded.js`

## Function Signature

To use this function you pass in a single string that contains the path that you need to exist. `makePathIfNeeded` will create each missing path until the entire path exists.

```js
makePathIfNeeded(path <string>);
```

## Usage

### Internal repo access

```js
const makePathIfNeeded = require('./lib/makePathIfNeeded');
makePathIfNeeded('dist/js/app');

```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {makePathIfNeeded} = require('omegalib');
// or
const makePathIfNeeded = require('omegalib').makePathIfNeeded;
```

### Exception

Paths must be relative to `process.cwd()`. You can not provide a `'/'` at the beginning of the path or the following exception will be thrown:

```js
throw new Error('Root Path is not acceptable');
```

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to the Omega-Lib repo |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-17 | Mike Collins | Initial Draft |
