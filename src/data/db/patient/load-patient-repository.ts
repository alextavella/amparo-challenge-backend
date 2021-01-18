import { Patient } from '@/domain/models'

export interface LoadPatientRepository {
  load(
    params: LoadPatientRepository.Params,
  ): Promise<LoadPatientRepository.Response>
}

export namespace LoadPatientRepository {
  export type Params = {
    id: string
    cpf?: string
  }
  export type Response = Patient | undefined
}
