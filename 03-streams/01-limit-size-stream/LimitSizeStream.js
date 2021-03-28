const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  _totalSize = 0;

  constructor({ limit, encoding }) {
    super({ limit, encoding });
    this._limit = limit;
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();
    const size = chunk.length;

    if (this._totalSize + size > this._limit) {
      const error = new LimitExceededError();
      callback(error);
    } else {
      this._totalSize += size;
      callback(null, data);
    }
  }
}

module.exports = LimitSizeStream;
