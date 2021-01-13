import { NumericValidator } from '@/validation/protocols'

export class MockNumericValidator implements NumericValidator {
  isValid(_number: string | number): boolean {
    return true
  }
}
