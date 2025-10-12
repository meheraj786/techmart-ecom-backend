class ApiError extends Error {
  constructor(message = "Something went wrong", errors = [], stack = "") {
    super(message);
    this.errors = errors;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
