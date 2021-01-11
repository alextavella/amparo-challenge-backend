export class ValidationError extends Error {
  constructor(paramName: string, message: string) {
    super(message)
    this.name = paramName
  }
}

export class ValidationStackError {
  constructor(public readonly inner: ValidationError[] = []) {}

  append(error: ValidationError) {
    this.inner.push(error)
  }
}

export interface ValidationErrors {
  [key: string]: string
}

export interface ValidationErrorsResult {
  message: string
  errors: ValidationErrors
}
