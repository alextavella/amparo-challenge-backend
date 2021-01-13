import { SearchPatientsByNameOrCpfRepository } from '@/data/db'
import { SearchPatientsByNameOrCpf } from '@/domain/usecases'

export class SearchPatientsByNameOrCpfService
  implements SearchPatientsByNameOrCpf {
  constructor(
    private readonly repository: SearchPatientsByNameOrCpfRepository,
  ) {}

  async search(
    term: string,
  ): Promise<SearchPatientsByNameOrCpfService.Response> {
    if (term) {
      return this.repository.searchByNameOrCpf(term)
    }

    return []
  }
}

export namespace SearchPatientsByNameOrCpfService {
  export type Response = SearchPatientsByNameOrCpf.Response
}
