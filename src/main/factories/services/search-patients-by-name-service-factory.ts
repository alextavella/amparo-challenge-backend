import { SearchPatientsByNameService } from '@/data/usecases'
import { PatientMemoryRepository } from '@/infra'

export const makeSearchPatientsByNameService = () =>
  new SearchPatientsByNameService(new PatientMemoryRepository())
