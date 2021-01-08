import { PatientMemoryRepository } from '@/infra/memorydb/patient-memory-repository'

export class FakePatientMemoryRepository extends PatientMemoryRepository {
  constructor() {
    super('patients_tests')
  }
}
