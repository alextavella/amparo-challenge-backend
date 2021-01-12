import { AppError } from '@/presentation/errors'

export class ActivityNotFound extends AppError {
  constructor() {
    super('Atividade não encontrada')
  }
}
