module.exports = str => (typeof str === 'string' ? ['/','\\'].includes(str.slice(-1)) : false);
