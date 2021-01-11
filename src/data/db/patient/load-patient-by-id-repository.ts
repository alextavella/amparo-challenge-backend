import { Patient } from '@/domain/models'

export interface LoadPatientByIdRepository {
  load(id: string): Promise<Patient | undefined>
}
