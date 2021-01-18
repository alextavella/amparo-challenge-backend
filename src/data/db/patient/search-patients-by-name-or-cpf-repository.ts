import { Patient } from '@/domain/models'

export interface SearchPatientsByNameOrCpfRepository {
  searchByNameOrCpf(
    term: string,
  ): Promise<SearchPatientsByNameOrCpfRepository.Response>
}

export namespace SearchPatientsByNameOrCpfRepository {
  export type Response = Patient[]
}
