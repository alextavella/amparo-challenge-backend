import { Validation } from '@/presentation/contracts'
import { MissingParamError } from '@/presentation/errors'

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | undefined {
    if (!input[this.fieldName] && input[this.fieldName] !== 0) {
      return new MissingParamError(this.fieldName)
    }
  }
}
