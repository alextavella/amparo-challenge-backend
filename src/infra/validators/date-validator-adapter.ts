import { DateValidator } from '@/validation/protocols'
import { format, parseISO } from 'date-fns'
import validator from 'validator'

export class DateValidatorAdapter implements DateValidator {
  isValid(date: string): boolean {
    try {
      const pattern = 'dd/MM/yyyy'
      const dateFormatted = format(parseISO(date), pattern)
      return validator.isDate(dateFormatted, {
        format: pattern,
      })
    } catch {
      return false
    }
  }
}
