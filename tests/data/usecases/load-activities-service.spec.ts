import { PatientEntity } from '@/data/entities'
import { LoadActivitiesService } from '@/data/usecases'
import { ActivityStatus } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'
import {
  FakeActivityMemoryRepository,
  FakePatientMemoryRepository,
} from '@/tests/infra'

let service: LoadActivities
let repository: FakeActivityMemoryRepository
let patientRepository: FakePatientMemoryRepository

describe('LoadActivitiesyService', () => {
  beforeEach(() => {
    repository = new FakeActivityMemoryRepository()
    patientRepository = new FakePatientMemoryRepository()
    service = new LoadActivitiesService(repository, patientRepository)

    jest.spyOn(patientRepository, 'load').mockImplementation((id: string) =>
      Promise.resolve({
        id,
        name: 'patient-name',
        cpf: '123-345-768-00',
      } as PatientEntity),
    )
  })

  it('should be able list activities', async () => {
    await repository.create({
      patient_id: 'patient-id',
      data_vencimento: new Date(2020, 0, 10, 12).toISOString(),
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const activities = await service.load({
      data: new Date(2020, 0, 10, 11).toISOString(),
    })

    expect(activities.length).toBe(1)
  })

  it('should not be able list activities with old validate date', async () => {
    await repository.create({
      patient_id: 'patient-id',
      data_vencimento: new Date(2020, 0, 10, 12).toISOString(),
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const activities = await service.load({
      data: new Date(2020, 0, 10, 13).toISOString(),
    })

    expect(activities.length).toBe(0)
  })
})
