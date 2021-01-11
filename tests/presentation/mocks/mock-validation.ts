import { Validation } from '@/presentation/contracts'

export class ValidationSpy implements Validation {
  error?: Error = undefined
  input: any

  validate(input: any): Error | undefined {
    this.input = input
    return this.error
  }
}
