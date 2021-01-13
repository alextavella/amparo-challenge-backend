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

    const activity = await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities } = await loadActivities.load({
      date: subHours(insertedDate, 1),
    })

    expect(activities.length).toBe(1)
    expect(activities[0].name).toEqual(activity.name)
    expect(activities[0].expire_date).toEqual(activity.expire_date)
    expect(activities[0].status).toEqual(activity.status)
  })

  it('should not be able list activities with old validate date', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities } = await loadActivities.load({
      date: addHours(insertedDate, 1),
    })

    expect(activities.length).toBe(0)
  })

  it('should be able paginate the result of activities', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    const first = await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id-1',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id-2',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.atrasado,
    })

    const third = await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id-3',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.atrasado,
    })

    const { total: total_1, data: activities_1 } = await loadActivities.load({
      page: 1,
      size: 1,
      date: insertedDate,
    })

    expect(total_1).toBe(3)
    expect(activities_1.length).toBe(1)
    expect(activities_1[0].name).toEqual(first.name)

    const { total: total_2, data: activities_2 } = await loadActivities.load({
      page: 2,
      size: 2,
      date: insertedDate,
    })

    expect(total_2).toBe(2)
    expect(activities_2.length).toBe(1)
    expect(activities_2[0].name).toEqual(third.name)
  })
})
