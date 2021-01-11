import { DateValidator } from '@/validation/protocols'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    return validator.isDate(date, { format: 'DD/MM/YYYY' })
  }
}
