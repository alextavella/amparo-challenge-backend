import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { DateValidator } from '@/validation/protocols'

export class DateValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator,
  ) {}

  validate(input: any) {
    const isValid = this.dateValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
