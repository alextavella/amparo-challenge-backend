import { ActivityStatus } from '@/domain/models'
import { InvalidParamError } from '@/presentation/errors'
import { OptionalValidation } from './base-validation'

export class AcitivityStatusValidation extends OptionalValidation {
  constructor(private readonly fieldName: string) {
    super()
  }

  validate(input: any): Error | undefined {
    const value = input[this.fieldName]

    if (this.isOptional && !value) {
      return undefined
    }

    const status = ActivityStatus[value as keyof typeof ActivityStatus]

    if (!status) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
