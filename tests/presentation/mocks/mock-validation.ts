import { Validation } from '@/presentation/contracts'

export class ValidationSpy implements Validation {
  error: Error = {} as Error
  input: any

  validate(input: any): Error {
    this.input = input
    return this.error
  }
}
