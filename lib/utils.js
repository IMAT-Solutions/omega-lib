const NS_TO_MS = 1000000; // number of nanoseconds per millisecond
const timers = {};

/**
 * Start the measurement of the execution time of a chunck of code.
 * @param {string} key - The key to use for execution time
 * @returns {undefined}
 */
function time(key) {
  timers[key] = process.hrtime();
}

/**
 * Measure the execution time of a chunck of code.
 * @param {string} key - The key to use for execution time
 * @returns {string} - The execution time
 */
function timeEnd(key) {
  if (timers[key]) {
    const [s, ns] = process.hrtime(timers[key]);
    delete timers[key];
    return `${key} execution time: ${s}s ${ns / NS_TO_MS}ms`;
  }
}


module.exports = {
  time, timeEnd
}
