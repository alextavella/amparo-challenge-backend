import { Patient } from '@/domain/models'

export interface LoadPatientByCpfRepository {
  loadByCpf(cpf: string): Promise<Patient | undefined>
}
