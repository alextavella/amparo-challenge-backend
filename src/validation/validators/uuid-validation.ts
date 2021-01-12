import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { UuidValidator } from '@/validation/protocols'

export class UuidValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly validator: UuidValidator,
  ) {}

  validate(input: any): Error | undefined {
    const isValid = this.validator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
