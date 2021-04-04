const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  _totalString = '';

  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    const data = chunk.toString();
    const arrayOfStrings = data.split(os.EOL);

    if (arrayOfStrings.length > 1) {
      this.push(this._totalString + arrayOfStrings[0]);
      this._totalString = arrayOfStrings[arrayOfStrings.length - 1];
      arrayOfStrings
          .slice(1, -1)
          .forEach((str) => this.push(str));
    } else {
      this._totalString += data;
    }

    callback();
  }

  _flush(callback) {
    callback(null, this._totalString);
  }
}

module.exports = LineSplitStream;
