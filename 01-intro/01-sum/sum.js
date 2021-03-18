function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('Hello');
  }

  return a + b;
}

module.exports = sum;
