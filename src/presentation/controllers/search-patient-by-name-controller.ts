import { SearchPatientsByName } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { anyError, badRequest, ok } from '@/presentation/helpers'
import { SearchPatientsViewModel } from '@/presentation/view-models'

export class SearchPatientsByNameController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly searchPatientsByName: SearchPatientsByName,
  ) {}

  async handle(
    request: SearchPatientsByNameController.Request,
  ): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const patients = await this.searchPatientsByName.search(request.name)

      return ok(SearchPatientsViewModel.mapCollection(patients))
    } catch (error) {
      return anyError(error)
    }
  }
}

export namespace SearchPatientsByNameController {
  export type Request = {
    name: string
  }
}
