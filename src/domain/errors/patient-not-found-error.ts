import { AppError } from '@/presentation/errors'

export class PatientNotFound extends AppError {
  constructor() {
    super('Paciente não encontrado')
  }
}
