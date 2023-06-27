class NoDataFound extends Error {
  constructor(...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoDataFound);
    }

    this.name = "NoDataFound";
    this.errorCode = "NO_DATA_FOUND";
    // Custom debugging information
    this.httpStatusCode = 404;
    this.date = new Date();
  }
}
module.exports = NoDataFound;
