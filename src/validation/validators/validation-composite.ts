import { Validation } from '@/presentation/contracts'
import {
  ValidationError,
  ValidationStackError,
  ValidationErrors,
  ValidationErrorsResult,
} from '@/presentation/errors'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error | Error[] | ValidationErrorsResult | undefined {
    const validations = new ValidationStackError()
    const errors = []

    for (const validation of this.validations) {
      const error = validation.validate(input)

      if (error) {
        if (error instanceof ValidationError) {
          validations.append(error)
        } else {
          errors.push(error)
        }
      }
    }

    if (validations.inner.length > 0) {
      const validErrors: ValidationErrors = {} as ValidationErrors

      validations.inner.forEach((e) => {
        validErrors[e.name] ||= e.message
      })

      return { message: 'Erro de validação', errors: validErrors }
    }

    if (errors.length > 0) {
      return errors as Error[]
    }

    return undefined
  }
}
