import { CreatePatients } from '@/domain/usecases'
import { HttpResponse, Validation } from '@/presentation/contracts'
import { Controller } from '@/presentation/contracts/controller'
import { anyError, badRequest, created } from '@/presentation/helpers'
import { PatientViewModel } from '@/presentation/view-models'

export class CreatePatientController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createPatients: CreatePatients,
  ) {}

  async handle(
    request: CreatePatientController.Request,
  ): Promise<HttpResponse<any>> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const patient = await this.createPatients.create(request)

      return created(PatientViewModel.map(patient))
    } catch (error) {
      return anyError(error)
    }
  }
}

export namespace CreatePatientController {
  export type Request = {
    name: string
    cpf: string
  }
}
