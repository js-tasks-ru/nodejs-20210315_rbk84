const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  _totalSize = 0;

  constructor(options) {
    super(options);
    this._limit = options.limit;
  }

  _transform(chunk, encoding, callback) {
    const size = chunk.length;

    if (this._totalSize + size > this._limit) {
      const error = new LimitExceededError();
      callback(error);
    } else {
      this._totalSize += size;
      callback(null, chunk);
    }
  }
}

module.exports = LimitSizeStream;
