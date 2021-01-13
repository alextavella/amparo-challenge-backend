import { SearchPatientsByNameOrCpf } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { anyError, badRequest, ok } from '@/presentation/helpers'
import { SearchPatientsViewModel } from '@/presentation/view-models'

export class SearchPatientsByNameOrCpfController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly searchPatientsByNameOrCpf: SearchPatientsByNameOrCpf,
  ) {}

  async handle(
    request: SearchPatientsByNameOrCpfController.Request,
  ): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const patients = await this.searchPatientsByNameOrCpf.search(request.term)

      return ok(SearchPatientsViewModel.mapCollection(patients))
    } catch (error) {
      return anyError(error)
    }
  }
}

export namespace SearchPatientsByNameOrCpfController {
  export type Request = {
    term: string
  }
}
