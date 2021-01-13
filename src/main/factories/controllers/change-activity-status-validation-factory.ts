import { UuidValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/contracts'
import {
  AcitivityStatusValidation,
  RequiredFieldValidation,
  UuidValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeChangeActivityStatusValidation = () => {
  const validations: Validation[] = []
  for (const field of ['id', 'status']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new UuidValidation('id', new UuidValidatorAdapter()))
  validations.push(new AcitivityStatusValidation('status'))
  return new ValidationComposite(validations)
}
