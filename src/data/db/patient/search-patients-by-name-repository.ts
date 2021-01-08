import { PatientEntity } from '@/data/entities'

export interface SearchPatientsByNameRepository {
  searchByName(name: string): Promise<PatientEntity[]>
}
