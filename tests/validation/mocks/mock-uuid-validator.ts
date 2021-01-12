import { UuidValidator } from '@/validation/protocols'

export class MockUuidValidator implements UuidValidator {
  isValid(_id: string): boolean {
    return true
  }
}
