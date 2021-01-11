import { Patient } from '@/domain/models'

export interface SearchPatientsByNameRepository {
  searchByName(name: string): Promise<Patient[]>
}
