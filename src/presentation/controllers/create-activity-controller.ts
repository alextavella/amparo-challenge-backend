import { ActivityStatus } from '@/domain/models'
import { CreateActivities } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { anyError, badRequest, created } from '@/presentation/helpers'
import { parseISODate } from '@/presentation/utils'
import { ActivityViewModel } from '@/presentation/view-models'

export class CreateActivityController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createActivities: CreateActivities,
  ) {}

  private makePayload(request: any): CreateActivities.Model {
    return {
      patient_id: request.patient_id,
      expire_date: parseISODate(request.expire_date),
      status: request.status as ActivityStatus,
      name: request.name,
    }
  }

  async handle(
    request: CreateActivityController.Request,
  ): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const activity = await this.createActivities.create(
        this.makePayload(request),
      )

      return created(ActivityViewModel.map(activity))
    } catch (error) {
      return anyError(error)
    }
  }
}

export namespace CreateActivityController {
  export type Request = {
    patient_id: string
    expire_date: string
    status: number
    name: string
  }
}
