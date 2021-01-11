import { ValidationError } from './validation-error'

export class MissingParamError extends ValidationError {
  constructor(paramName: string) {
    super(paramName, `Parâmetro obrigatório`)
  }
}
