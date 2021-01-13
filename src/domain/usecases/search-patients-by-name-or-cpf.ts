import { Patient } from '@/domain/models'

export interface SearchPatientsByNameOrCpf {
  search(term: string): Promise<SearchPatientsByNameOrCpf.Response>
}

export namespace SearchPatientsByNameOrCpf {
  export type Response = Patient[]
}
