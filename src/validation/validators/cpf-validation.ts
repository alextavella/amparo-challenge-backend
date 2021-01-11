import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { CpfValidator } from '@/validation/protocols'

export class CpfValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly validator: CpfValidator,
  ) {}

  validate(input: any): Error | undefined {
    const isValid = this.validator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
