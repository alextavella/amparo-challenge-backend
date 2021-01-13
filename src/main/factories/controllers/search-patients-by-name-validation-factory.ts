import { Validation } from '@/presentation/contracts'
import {
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeSearchPatientsByNameValidation = () => {
  const validations: Validation[] = []
  for (const field of ['name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
