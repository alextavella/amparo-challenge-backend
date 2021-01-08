import { LoadActivityByIdRepository, SaveActivityRepository } from '@/data/db'
import {
  convertToActivityEntityStatus,
  convertToActivityStatus,
} from '@/data/entities'
import { ActivityNotFound } from '@/domain/errors'
import { ChangeActivityStatus } from '@/domain/usecases'

export interface Repo
  extends LoadActivityByIdRepository,
    SaveActivityRepository {}

export class ChangeActivityStatusService implements ChangeActivityStatus {
  constructor(private readonly repository: Repo) {}

  async change(
    model: ChangeActivityStatusService.Model,
  ): Promise<ChangeActivityStatusService.Response> {
    const activity = await this.repository.load(model.id)

    if (!activity) {
      throw new ActivityNotFound()
    }

    Object.assign(activity, {
      status: convertToActivityEntityStatus(model.status),
    })

    const entity = await this.repository.save(activity)

    const { id, data_vencimento, name, status } = entity

    return {
      id,
      data_vencimento: data_vencimento.toISOString(),
      name,
      status: convertToActivityStatus(status),
    }
  }
}

export namespace ChangeActivityStatusService {
  export type Model = ChangeActivityStatus.Model
  export type Response = ChangeActivityStatus.Response
}
