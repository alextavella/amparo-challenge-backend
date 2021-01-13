import { ChangeActivityStatus } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { anyError, badRequest, ok } from '@/presentation/helpers'
import { ChangeActivityStatusViewModel } from '@/presentation/view-models'

export class ChangeActivityStatusController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly changeActivityStatus: ChangeActivityStatus,
  ) {}

  async handle(
    request: ChangeActivityStatusController.Request,
  ): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const activity = await this.changeActivityStatus.change(request)

      return ok(ChangeActivityStatusViewModel.map(activity))
    } catch (error) {
      return anyError(error)
    }
  }
}

export namespace ChangeActivityStatusController {
  export type Request = {
    id: string
    status: number
  }
}
