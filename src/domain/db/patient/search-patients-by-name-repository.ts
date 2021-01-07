import { SearchPatientsByName } from '@/domain/usecases'

export interface SearchPatientsByNameRepository {
  searchByName(name: string): Promise<SearchPatientsByName.Response>
}
