import { Patient } from '@/domain/models'

export interface SearchPatientsByName {
  search(name: string): Promise<SearchPatientsByName.Response>
}

export namespace SearchPatientsByName {
  export type Response = Patient[]
}
