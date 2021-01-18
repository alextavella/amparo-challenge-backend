import {
  CpfValidatorAdapter,
  DateValidatorAdapter,
  NumericValidatorAdapter,
} from '@/infra/validators'
import { Validation } from '@/presentation/contracts'
import {
  AcitivityStatusValidation,
  CpfValidation,
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
  validations.push(new AcitivityStatusValidation('status').optional())
  validations.push(
    new CpfValidation('cpf', new CpfValidatorAdapter()).optional(),
  )
  return new ValidationComposite(validations)
}
