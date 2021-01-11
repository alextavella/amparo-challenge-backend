import { LoadActivitiesService } from '@/data/usecases'
import { ActivityStatus } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'
import {
  FakeActivityMemoryRepository,
  FakePatientMemoryRepository,
} from '@/tests/infra'
import { addHours, subHours } from 'date-fns'

let loadActivities: LoadActivities
let fakeActivityMemoryRepository: FakeActivityMemoryRepository
let fakePatientMemoryRepository: FakePatientMemoryRepository

describe('LoadActivitiesyService', () => {
  beforeEach(() => {
    fakeActivityMemoryRepository = new FakeActivityMemoryRepository()
    fakePatientMemoryRepository = new FakePatientMemoryRepository()
    loadActivities = new LoadActivitiesService(
      fakeActivityMemoryRepository,
      fakePatientMemoryRepository,
    )

    jest
      .spyOn(fakePatientMemoryRepository, 'load')
      .mockImplementation((id: string) =>
        Promise.resolve({
          id,
          name: 'patient-name',
          cpf: '123-345-768-00',
        }),
      )
  })

  it('should be able list activities', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      birthday: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const activities = await loadActivities.load({
      data: subHours(insertedDate, 1),
    })

    expect(activities.length).toBe(1)
  })

  it('should not be able list activities with old validate date', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      birthday: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const activities = await loadActivities.load({
      data: addHours(insertedDate, 1),
    })

    expect(activities.length).toBe(0)
  })
})
