import { LoadPatientRepository } from '@/data/db'
import { LoadActivitiesService } from '@/data/usecases'
import { ActivityStatus } from '@/domain/models'
import { LoadActivities } from '@/domain/usecases'
import {
  FakeActivityMemoryRepository,
  FakePatientMemoryRepository,
} from '@/tests/infra'
import { addHours, subDays, subHours } from 'date-fns'

let loadActivities: LoadActivities
let fakeActivityMemoryRepository: FakeActivityMemoryRepository
let fakePatientMemoryRepository: FakePatientMemoryRepository

const patient_cpf = '123-345-768-00'

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
      .mockImplementation((params: LoadPatientRepository.Params) =>
        Promise.resolve({
          id: params.id,
          name: 'patient-name',
          cpf: patient_cpf,
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

  it('should not be able list activities on past', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities } = await loadActivities.load({
      date: subDays(insertedDate, 1),
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

  it('should be able list activities when there is status', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities_status_aberto } = await loadActivities.load({
      date: addHours(insertedDate, 1),
      status: ActivityStatus.aberto,
    })

    expect(activities_status_aberto.length).toBe(1)
  })

  it('should not be able list activities when there is not status', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities_status_finalizado } = await loadActivities.load({
      date: addHours(insertedDate, 1),
      status: ActivityStatus.finalizado,
    })

    const { data: activities_status_atrasado } = await loadActivities.load({
      date: addHours(insertedDate, 1),
      status: ActivityStatus.atrasado,
    })

    expect(activities_status_finalizado.length).toBe(0)
    expect(activities_status_atrasado.length).toBe(0)
  })

  it('should be able list activities when there is cpf', async () => {
    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities } = await loadActivities.load({
      date: addHours(insertedDate, 1),
      cpf: patient_cpf,
    })

    expect(activities.length).toBe(1)
  })

  it('should not be able list activities when there is not cpf', async () => {
    jest
      .spyOn(fakePatientMemoryRepository, 'load')
      .mockImplementation(() => Promise.resolve(undefined))

    const insertedDate = new Date(2020, 0, 10, 12)

    await fakeActivityMemoryRepository.create({
      patient_id: 'patient-id',
      expire_date: insertedDate,
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const { data: activities } = await loadActivities.load({
      date: addHours(insertedDate, 1),
      cpf: '078.762.130-73',
    })

    expect(activities.length).toBe(0)
  })
})
