import { LoadActivities } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { now, parseISODate, resetHour } from '@/presentation/utils'
import { ListActivitiesViewModel } from '@/presentation/view-models'

export class LoadActivitiesController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadActivities: LoadActivities,
  ) {}

  async handle(
    request: LoadActivitiesController.Request,
  ): Promise<HttpResponse<ListActivitiesViewModel[]>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const payload = {
        page: request.page,
        size: request.size,
        date: resetHour(request.date ? parseISODate(request.date) : now()),
      }

      const {
        page,
        size,
        total,
        data: activities,
      } = await this.loadActivities.load(payload)

      if (activities.length === 0) return noContent()

      const result = {
        page,
        size,
        total,
        data: ListActivitiesViewModel.mapCollection(activities),
      }

      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadActivitiesController {
  export type Request = {
    page: number
    size: number
    date: string
  }
}
