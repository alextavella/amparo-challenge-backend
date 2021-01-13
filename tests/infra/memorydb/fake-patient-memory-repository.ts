import { Patient } from '@/domain/models'
import { PatientMemoryRepository } from '@/infra/memorydb/patient-memory-repository'
import { FakeMemoryDb } from './fake-db'

export class FakePatientMemoryRepository extends PatientMemoryRepository {
  constructor(private readonly collectionName = 'patients_tests') {
    super(collectionName)
    super.collection = new FakeMemoryDb().collection<Patient>(collectionName)
  }
}
