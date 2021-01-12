import { DateValidatorAdapter, UuidValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/contracts'
import {
  AcitivityStatusValidation,
  DateValidation,
  RequiredFieldValidation,
  UuidValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeCreateActivityValidation = () => {
  const validations: Validation[] = []
  for (const field of ['patient_id', 'expire_date', 'status', 'name']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new UuidValidation('patient_id', new UuidValidatorAdapter()))
  validations.push(
    new DateValidation('expire_date', new DateValidatorAdapter()),
  )
  validations.push(new AcitivityStatusValidation('status'))
  return new ValidationComposite(validations)
}
