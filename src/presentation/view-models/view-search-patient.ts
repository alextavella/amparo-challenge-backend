import { Patient } from '@/domain/models'

export class SearchPatientsViewModel {
  id!: string
  nome!: string

  static map(entity: Patient): SearchPatientsViewModel {
    const { id, name } = entity

    return {
      id,
      nome: name,
    }
  }

  static mapCollection(entities: Patient[]): SearchPatientsViewModel[] {
    return entities.map(SearchPatientsViewModel.map)
  }
}
