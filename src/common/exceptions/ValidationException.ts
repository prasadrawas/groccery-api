class ValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}

export default ValidationException;
