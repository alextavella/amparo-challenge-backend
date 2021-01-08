import { CreateActivityRepository, LoadPatientByIdRepository } from '@/data/db'
import { PatientNotFound } from '@/domain/errors'
import { Activity, ActivityStatus } from '@/domain/models'
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

    const entity = await this.createActivityRepo.create(model)

    const { data_vencimento, name, status } = entity

    return {
      patient_id: patient.id,
      data_vencimento: data_vencimento.toISOString(),
      name,
      status: status as ActivityStatus,
    }
  }
}

export namespace CreateActivityService {
  export type Model = CreateActivities.Model
  export type Response = Activity
}
