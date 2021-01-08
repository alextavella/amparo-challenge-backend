import { CreateActivityRepository, LoadPatientByIdRepository } from '@/data/db'
import { convertToActivityStatus } from '@/data/entities'
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

    const entity = await this.createActivityRepo.create(model)

    const { id, data_vencimento, name, status } = entity

    return {
      id,
      patient_id: patient.id,
      data_vencimento: data_vencimento.toISOString(),
      name,
      status: convertToActivityStatus(status),
    }
  }
}

export namespace CreateActivityService {
  export type Model = CreateActivities.Model
  export type Response = CreateActivities.Response
}
