import { Patient } from '@/domain/models'

export class CreatePatientsViewModel {
  id!: string
  name!: string
  cpf!: string

  static map(entity: Patient): CreatePatientsViewModel {
    return {
      ...entity,
    }
  }

  static mapCollection(entities: Patient[]): CreatePatientsViewModel[] {
    return entities.map(CreatePatientsViewModel.map)
  }
}
