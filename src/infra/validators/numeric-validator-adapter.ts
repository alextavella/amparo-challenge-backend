import { NumericValidator } from '@/validation/protocols'
import validator from 'validator'

export class NumericValidatorAdapter implements NumericValidator {
  isValid(value: string | number): boolean {
    return validator.isNumeric(String(value))
  }
}
