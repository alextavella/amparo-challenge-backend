import { CreatePatientsService } from '@/data/usecases'
import { PatientDuplicate } from '@/domain/errors'
import { CreatePatients } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let createPatients: CreatePatients
let createPatientRepository: FakePatientMemoryRepository

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

  it('should not be able create patient with same cpf', async () => {
    await createPatients.create({
      name: 'Alex',
      cpf: '12345678900',
    })
    await expect(
      createPatients.create({
        name: 'Alex',
        cpf: '12345678900',
      }),
    ).rejects.toBeInstanceOf(PatientDuplicate)
  })
})
