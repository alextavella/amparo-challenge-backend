import { Patient } from '@/domain/models'

export interface LoadPatientByCpfRepository {
  loadByCpf(cpf: string): Promise<LoadPatientByCpfRepository.Response>
}

export namespace LoadPatientByCpfRepository {
  export type Response = Patient | undefined
}
