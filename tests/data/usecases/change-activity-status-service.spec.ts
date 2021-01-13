import { ChangeActivityStatusService, Repository } from '@/data/usecases'
import { ActivityNotFound } from '@/domain/errors'
import { ActivityStatus } from '@/domain/models'
import { ChangeActivityStatus } from '@/domain/usecases'
import { FakeActivityMemoryRepository } from '@/tests/infra'

let changeActivityStatus: ChangeActivityStatus
let fakeActivityMemoryRepository: FakeActivityMemoryRepository

describe('ChangeActivityStatusService', () => {
  beforeEach(() => {
    fakeActivityMemoryRepository = new FakeActivityMemoryRepository()
    changeActivityStatus = new ChangeActivityStatusService(
      fakeActivityMemoryRepository as Repository,
    )
  })

  it('should be able change the activity status', async () => {
    const activity = await fakeActivityMemoryRepository.create({
      patient_id: 'patient_id',
      expire_date: new Date(),
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const updated = await changeActivityStatus.change({
      id: activity.id,
      status: ActivityStatus.atrasado,
    })

    expect(updated.id).toBe(activity.id)
    expect(updated.status).toBe(ActivityStatus.atrasado)
  })

  it('should not be able change the activity status when there is not activity', async () => {
    await expect(
      changeActivityStatus.change({
        id: 'activity-id',
        status: ActivityStatus.atrasado,
      }),
    ).rejects.toBeInstanceOf(ActivityNotFound)
  })
})
