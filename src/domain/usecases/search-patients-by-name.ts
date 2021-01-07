import { Patient } from '@/domain/models'

export interface SearchPatientsByName {
  create(name: string): Promise<SearchPatientsByName.Response>
}

export namespace SearchPatientsByName {
  export type Response = Patient[]
}
