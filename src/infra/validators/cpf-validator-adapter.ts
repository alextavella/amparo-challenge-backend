import { DateValidator } from '@/validation/protocols'
import { cpf as validator } from 'cpf-cnpj-validator'

export class CpfValidatorAdapter implements DateValidator {
  isValid(cpf: string): boolean {
    return validator.isValid(cpf)
  }
}
