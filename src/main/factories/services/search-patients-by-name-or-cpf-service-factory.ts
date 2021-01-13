import { SearchPatientsByNameOrCpfService } from '@/data/usecases'
import { PatientMemoryRepository } from '@/infra'

export const makeSearchPatientsByNameOrCpfService = () =>
  new SearchPatientsByNameOrCpfService(new PatientMemoryRepository())
