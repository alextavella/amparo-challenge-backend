import { Patient } from '@/domain/models'

export interface SearchPatientsByNameOrCpfRepository {
  searchByNameOrCpf(term: string): Promise<Patient[]>
}
