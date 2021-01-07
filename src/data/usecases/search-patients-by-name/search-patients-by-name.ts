import { PatientEntity } from '@/data/entities'
import { SearchPatientsByNameRepository } from '@/domain/db'
import { SearchPatientsByName } from '@/domain/usecases'

export class SearchPatientsByNameService implements SearchPatientsByName {
  constructor(
    private readonly searchPatientsByNameRepository: SearchPatientsByNameRepository,
  ) {}

  async search(name: string): Promise<SearchPatientsByNameService.Response> {
    return await this.searchPatientsByNameRepository.searchByName(name)
  }
}

export namespace SearchPatientsByNameService {
  export type Response = PatientEntity[]
}
