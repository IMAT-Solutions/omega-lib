# endsInSlash

Check to see if a string, representing a path, ends with a slash. Both `'/'` and `'\'` are checked.

## Library Function

This library function is located in `./lib/endsInSlash.js`


## Function Signature

To use this function you pass in a string that may or may not include a slash as the last character. The return value will be `true` if the last char was a slash.

```js
<bool> endsInSlash(path <string>);
```

## Usage

### Internal repo access

```js
const endsInSlash = require('./lib/endsInSlash');

if (endsInSlash('dist/')) }
  console.log("Yes, there is a slash");
}
```

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {endsInSlash} = require('omegalib');
// or
const endsInSlash = require('omegalib').endsInSlash;
```

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to Omega-Lib repo |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-15 | Mike Collins | Initial Draft |
