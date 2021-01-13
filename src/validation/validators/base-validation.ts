import { NoRequiredValidation } from '@/presentation/contracts'

export abstract class OptionalValidation implements NoRequiredValidation {
  protected isOptional = false

  optional(): this {
    this.isOptional = true
    return this
  }
}

export abstract class BaseValidation extends OptionalValidation {
  valid(value: any): boolean {
    const isEmpty = value === undefined || value === ''
    return this.isOptional && isEmpty
  }
}
