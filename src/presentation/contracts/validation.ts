import { ValidationErrorsResult } from '../errors'

export interface Validation {
  validate(input: any): Error | Error[] | ValidationErrorsResult | undefined
}

export interface NoRequiredValidation {
  optional(): void
}
