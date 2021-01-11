import { CreateActivityRepository, LoadPatientByIdRepository } from '@/data/db'
import { PatientNotFound } from '@/domain/errors'
import { CreateActivities } from '@/domain/usecases'

export class CreateActivityService implements CreateActivities {
  constructor(
    private readonly createActivityRepo: CreateActivityRepository,
    private readonly loadPatientRepo: LoadPatientByIdRepository,
  ) {}

  async create(
    model: CreateActivityService.Model,
  ): Promise<CreateActivityService.Response> {
    const patient = await this.loadPatientRepo.load(model.patient_id)

    if (!patient) {
      throw new PatientNotFound()
    }

    return this.createActivityRepo.create(model)
  }
}

export namespace CreateActivityService {
  export type Model = CreateActivities.Model
  export type Response = CreateActivities.Response
}
