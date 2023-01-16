export class ApiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class ValidationError extends ApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class WrongRequestError extends ApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

export class NotAuthorizedError extends ApiError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
