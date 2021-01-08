import { ActivityEntityStatus } from '@/data/entities'
import { ChangeActivityStatusService, Repo } from '@/data/usecases'
import { ActivityNotFound } from '@/domain/errors'
import { ActivityStatus } from '@/domain/models'
import { ChangeActivityStatus } from '@/domain/usecases'
import { FakeActivityMemoryRepository } from '@/tests/infra'

let service: ChangeActivityStatus
let repository: FakeActivityMemoryRepository

describe('ChangeActivityStatusService', () => {
  beforeEach(() => {
    repository = new FakeActivityMemoryRepository()
    service = new ChangeActivityStatusService(repository as Repo)
  })

  it('should be able change the activity status', async () => {
    const activity = await repository.create({
      patient_id: 'patient_id',
      data_vencimento: '2021-01-08T02:51:55.758Z',
      name: 'Verificar com o paciente se o medicamento fez efeito',
      status: ActivityStatus.aberto,
    })

    const updated = await service.change({
      id: activity.id,
      status: ActivityStatus.atrasado,
    })

    expect(updated.id).toBe(activity.id)
    expect(updated.status).toBe(ActivityEntityStatus.atrasado)
  })

  it('should not be able change the activity status when there is not activity', async () => {
    await expect(
      service.change({
        id: 'activity-id',
        status: ActivityStatus.atrasado,
      }),
    ).rejects.toBeInstanceOf(ActivityNotFound)
  })
})
