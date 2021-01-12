import { CpfValidator } from '@/validation/protocols'

export class MockCpfValidator implements CpfValidator {
  isValid(_cpf: string): boolean {
    return true
  }
}
