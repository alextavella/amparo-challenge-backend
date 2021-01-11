import { ValidationError } from './validation-error'

export class InvalidParamError extends ValidationError {
  constructor(paramName: string) {
    super(paramName, `Parâmetro inválido`)
  }
}
