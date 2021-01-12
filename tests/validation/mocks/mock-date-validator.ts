import { DateValidator } from '@/validation/protocols'

export class MockDateValidator implements DateValidator {
  isValid(_date: string): boolean {
    return true
  }
}
