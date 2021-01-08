import { CreatePatientsService } from '@/data/usecases'
import { CreatePatientRepository } from '@/data/db'
import { CreatePatients } from '@/domain/usecases'
import { FakePatientMemoryRepository } from '@/tests/infra'

let service: CreatePatients
let repository: CreatePatientRepository

describe('CreatePatientService', () => {
  beforeEach(() => {
    repository = new FakePatientMemoryRepository()
    service = new CreatePatientsService(repository)
  })

  it('should be able create a patient', async () => {
    const patient = await service.create({
      name: 'Alex',
      cpf: '12345678900',
    })

    expect(patient).toHaveProperty('id')
  })
})
