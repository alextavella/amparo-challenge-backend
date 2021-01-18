import { InvalidParamError } from '@/presentation/errors'
import { CpfValidator } from '@/validation/protocols'
import { OptionalValidation } from './base-validation'

export class CpfValidation extends OptionalValidation {
  constructor(
    private readonly fieldName: string,
    private readonly validator: CpfValidator,
  ) {
    super()
  }

  validate(input: any): Error | undefined {
    const value = input[this.fieldName] ?? ''

    if (this.isOptional && value.length === 0) return undefined

    const isValid = this.validator.isValid(value)

    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
