# utils

A set us useful utility functions.

## Library Function

This library function is located in `./lib/utils.js`

This file includes the following functions:

* time
* timeEnd

More will be added as needed,

#### time

Start a timer based on the supplied key.

#### timeEnd

End the timer based on the supplied key and return a string indicating how long it took.

## Function Signatures

```js
time(key <string>)
<string> timeEnd(key <string>)
```

## Usage

### Internal repo access

```js
const {time, timeEnd} = require('./lib/utils');
time('Fidget');

/// Do something that takes time

console.log(timeEnd('Fidget'));
```

The above code will output something like:
`Fidget execution time: 1s 32ms`

### External repo access

If you are using this function from outside of the `omegalib` repo then you need to use a different require statement:

```js
const {utils} = require('omegalib');
// or
const utils = require('omegalib').utils;
```

---

## Updated History:

| Date | Author | Description |
| --- | --- | --- |
| 2018-11-26 | Mike Collins | Moved to the Omega-Lib repo |
| 2018-08-22 | Mike Collins | Cleaned up after Pear Review |
| 2018-08-17 | Mike Collins | Initial Draft |
