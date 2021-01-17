import { AppError } from '@/presentation/errors'

export class PatientDuplicate extends AppError {
  constructor() {
    super('Paciente duplicado')
  }
}
