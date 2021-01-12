import { CpfValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/contracts'
import {
  CpfValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '@/validation/validators'

export const makeCreatePatientValidation = () => {
  const validations: Validation[] = []
  for (const field of ['name', 'cpf']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()))
  return new ValidationComposite(validations)
}
