import { CreatePatientsService } from '@/data/usecases'
import { PatientMemoryRepository } from '@/infra'

export const makeCreatePatientService = () =>
  new CreatePatientsService(new PatientMemoryRepository())
