import { Patient } from '@/domain/models'

export class PatientViewModel {
  id!: string
  nome!: string
  cpf!: string

  static map(entity: Patient): PatientViewModel {
    const { id, name, cpf } = entity

    return {
      id,
      nome: name,
      cpf,
    }
  }

  static mapCollection(entities: Patient[]): PatientViewModel[] {
    return entities.map(PatientViewModel.map)
  }
}
