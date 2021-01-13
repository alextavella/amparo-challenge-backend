import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { NumericValidator } from '@/validation/protocols'
import { BaseValidation } from './base-validation'

export class NumericValidation extends BaseValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly numericValidator: NumericValidator,
  ) {
    super()
  }

  validate(input: any) {
    const value = input[this.fieldName]
    const isValid = this.numericValidator.isValid(value)
    if (!isValid && !super.valid(value)) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
