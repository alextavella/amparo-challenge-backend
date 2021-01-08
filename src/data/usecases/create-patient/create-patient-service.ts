import { PatientEntity } from '@/data/entities'
import { CreatePatientRepository } from '@/data/db'
import { CreatePatients } from '@/domain/usecases'

export class CreatePatientsService implements CreatePatients {
  constructor(private readonly repository: CreatePatientRepository) {}

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Response> {
    return await this.repository.create(model)
  }
}

export namespace CreatePatientsService {
  export type Model = CreatePatients.Model
  export type Response = PatientEntity
}
