import { CreateActivityRepository, LoadPatientByIdRepository } from '@/data/db'
import { CreateActivityService } from '@/data/usecases'
import { PatientNotFound } from '@/domain/errors'
import { ActivityStatus } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import {
  FakeActivityMemoryRepository,
  FakePatientMemoryRepository,
} from '@/tests/infra'

let service: CreateActivities
let repository: CreateActivityRepository
let patientRepository: FakePatientMemoryRepository

describe('CreateActivityService', () => {
  beforeEach(() => {
    repository = new FakeActivityMemoryRepository()
    patientRepository = new FakePatientMemoryRepository()
    service = new CreateActivityService(
      repository,
      patientRepository as LoadPatientByIdRepository,
    )
  })

  it('should be able create an activity', async () => {
    const patient = await patientRepository.create({
      name: 'Alex',
      cpf: 'cpf',
    })

    const { id: patient_id } = patient

    const activity = await service.create({
      patient_id,
      data_vencimento: '2021-01-08T02:51:55.758Z',
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    expect(activity).toHaveProperty('id')
  })

  it('should not be able create an activity when there is not patient', async () => {
    await expect(
      service.create({
        patient_id: 'patient-id',
        data_vencimento: '2021-01-08T02:51:55.758Z',
        name: 'Verificar com o paciente se o medicamento fez efeito',
        status: ActivityStatus.aberto,
      }),
    ).rejects.toBeInstanceOf(PatientNotFound)
  })
})
