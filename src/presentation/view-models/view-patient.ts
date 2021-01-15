import { Patient } from '@/domain/models'

export class PatientViewModel {
  id!: string
  name!: string
  cpf!: string

  static map(entity: Patient): PatientViewModel {
    const { id, name, cpf } = entity

    return {
      id,
      name,
      cpf,
    }
  }
}
