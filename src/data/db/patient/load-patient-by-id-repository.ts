import { PatientEntity } from '@/data/entities'

export interface LoadPatientByIdRepository {
  load(id: string): Promise<PatientEntity | undefined>
}
