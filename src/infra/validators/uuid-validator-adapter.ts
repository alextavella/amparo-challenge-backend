import { UuidValidator } from '@/validation/protocols'
import validator from 'validator'

export class UuidValidatorAdapter implements UuidValidator {
  isValid(id: string): boolean {
    return validator.isUUID(id)
  }
}
