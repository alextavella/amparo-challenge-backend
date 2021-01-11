import { CreatePatientRepository } from '@/data/db'
import { CreatePatientsService } from '@/data/usecases'
import { CreatePatients } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let createPatients: CreatePatients
let createPatientRepository: CreatePatientRepository

describe('CreatePatientService', () => {
  beforeEach(() => {
    createPatientRepository = new FakePatientMemoryRepository()
    createPatients = new CreatePatientsService(createPatientRepository)
  })

  it('should be able create a patient', async () => {
    const patient = await createPatients.create({
      name: 'Alex',
      cpf: '12345678900',
    })

    expect(patient).toHaveProperty('id')
  })
})
