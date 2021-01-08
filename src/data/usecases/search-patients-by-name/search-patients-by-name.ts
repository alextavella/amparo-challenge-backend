import { PatientEntity } from '@/data/entities'
import { SearchPatientsByNameRepository } from '@/data/db'
import { SearchPatientsByName } from '@/domain/usecases'

export class SearchPatientsByNameService implements SearchPatientsByName {
  constructor(private readonly repository: SearchPatientsByNameRepository) {}

  async search(name: string): Promise<SearchPatientsByNameService.Response> {
    return await this.repository.searchByName(name)
  }
}

export namespace SearchPatientsByNameService {
  export type Response = PatientEntity[]
}
