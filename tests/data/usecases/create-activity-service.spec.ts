import { CreateActivityRepository } from '@/data/db'
import { CreateActivityService } from '@/data/usecases'
import { PatientNotFound } from '@/domain/errors'
import { ActivityStatus } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import {
  FakeActivityMemoryRepository,
  FakePatientMemoryRepository,
} from '@/tests/infra'

let createActivities: CreateActivities
let createActivityRepository: CreateActivityRepository
let fakePatientMemoryRepository: FakePatientMemoryRepository

describe('CreateActivityService', () => {
  beforeEach(() => {
    createActivityRepository = new FakeActivityMemoryRepository()
    fakePatientMemoryRepository = new FakePatientMemoryRepository()
    createActivities = new CreateActivityService(
      createActivityRepository,
      fakePatientMemoryRepository,
    )
  })

  it('should be able create an activity', async () => {
    const patient = await fakePatientMemoryRepository.create({
      name: 'Alex',
      cpf: 'cpf',
    })

    const { id: patient_id } = patient

    const activity = await createActivities.create({
      patient_id,
      expire_date: new Date(),
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    expect(activity).toHaveProperty('id')
  })

  it('should not be able create an activity when there is not patient', async () => {
    await expect(
      createActivities.create({
        patient_id: 'patient-id',
        expire_date: new Date(),
        name: 'Verificar com o paciente se o medicamento fez efeito',
        status: ActivityStatus.aberto,
      }),
    ).rejects.toBeInstanceOf(PatientNotFound)
  })
})
