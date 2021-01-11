import { LoadActivityByIdRepository, SaveActivityRepository } from '@/data/db'
import { ActivityNotFound } from '@/domain/errors'
import { ChangeActivityStatus } from '@/domain/usecases'

export interface Repository
  extends LoadActivityByIdRepository,
    SaveActivityRepository {}

export class ChangeActivityStatusService implements ChangeActivityStatus {
  constructor(private readonly repository: Repository) {}

  async change(
    model: ChangeActivityStatusService.Model,
  ): Promise<ChangeActivityStatusService.Response> {
    const activity = await this.repository.load(model.id)

    if (!activity) {
      throw new ActivityNotFound()
    }

    const { status } = model

    Object.assign(activity, { status })

    return this.repository.save(activity)
  }
}

export namespace ChangeActivityStatusService {
  export type Model = ChangeActivityStatus.Model
  export type Response = ChangeActivityStatus.Response
}
