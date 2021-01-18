import { CreateActivityRepository, LoadPatientRepository } from '@/data/db'
import { PatientNotFound } from '@/domain/errors'
import { CreateActivities } from '@/domain/usecases'

export class CreateActivityService implements CreateActivities {
  constructor(
    private readonly createActivityRepository: CreateActivityRepository,
    private readonly loadPatientRepository: LoadPatientRepository,
  ) {}

  async create(
    model: CreateActivityService.Model,
  ): Promise<CreateActivityService.Response> {
    const patient = await this.loadPatientRepository.load({
      id: model.patient_id,
    })

    if (!patient) {
      throw new PatientNotFound()
    }

    return this.createActivityRepository.create(model)
  }
}

export namespace CreateActivityService {
  export type Model = CreateActivities.Model
  export type Response = CreateActivities.Response
}
