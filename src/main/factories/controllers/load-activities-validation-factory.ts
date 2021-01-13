import {
  DateValidatorAdapter,
  NumericValidatorAdapter,
} from '@/infra/validators'
import { Validation } from '@/presentation/contracts'
import {
  DateValidation,
  NumericValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeLoadActivitiesValidation = () => {
  const validations: Validation[] = []
  validations.push(new NumericValidation('page', new NumericValidatorAdapter()))
  validations.push(new NumericValidation('size', new NumericValidatorAdapter()))
  validations.push(
    new DateValidation('date', new DateValidatorAdapter()).optional(),
  )
  return new ValidationComposite(validations)
}
