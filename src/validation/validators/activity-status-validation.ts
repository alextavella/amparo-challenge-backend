import { ActivityStatus } from '@/domain/models'
import { Validation } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'

export class AcitivityStatusValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | undefined {
    const status =
      ActivityStatus[input[this.fieldName] as keyof typeof ActivityStatus]

    if (!status) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
