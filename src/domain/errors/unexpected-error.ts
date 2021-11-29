export class UnexpectedError extends Error {
  constructor() {
    super(
      "Unexpected error. Maybe you forgot to set REACT_APP_ENTITY environment variable or this entity is inactive"
    );
    this.name = "UnexpectedError";
  }
}
