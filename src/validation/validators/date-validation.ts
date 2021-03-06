import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { DateValidator } from '@/validation/protocols'
import { BaseValidation } from './base-validation'

export class DateValidation extends BaseValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator,
  ) {
    super()
  }

  validate(input: any) {
    const value = input[this.fieldName]
    const isValid = this.dateValidator.isValid(value)
    if (!isValid && !super.valid(value)) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
