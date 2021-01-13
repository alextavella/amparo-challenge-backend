import { SearchPatientsByNameRepository } from '@/data/db'
import { SearchPatientsByName } from '@/domain/usecases'

export class SearchPatientsByNameService implements SearchPatientsByName {
  constructor(private readonly repository: SearchPatientsByNameRepository) {}

  async search(name: string): Promise<SearchPatientsByNameService.Response> {
    if (name) {
      return this.repository.searchByName(name)
    }

    return []
  }
}

export namespace SearchPatientsByNameService {
  export type Response = SearchPatientsByName.Response
}
