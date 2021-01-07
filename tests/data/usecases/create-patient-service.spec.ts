import { CreatePatientRepository } from '@/data/db'
import { CreatePatientsService } from '@/data/usecases'
import { CreatePatients } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra/memorydb'

let createPatients: CreatePatients
let patientMemoryRepository: CreatePatientRepository

describe('CreatePatientService', () => {
  beforeEach(() => {
    patientMemoryRepository = new FakePatientMemoryRepository()
    createPatients = new CreatePatientsService(patientMemoryRepository)
  })

  it('should be able create a patient', async () => {
    const patient = await createPatients.create({
      name: 'Alex',
      cpf: '12345678900',
    })

    expect(patient).toHaveProperty('id')
  })
})