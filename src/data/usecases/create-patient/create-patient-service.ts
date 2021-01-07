import { PatientEntity } from '@/data/entities'
import { CreatePatientRepository } from '@/domain/db'
import { CreatePatients } from '@/domain/usecases'

export class CreatePatientsService implements CreatePatients {
  constructor(
    private readonly createPatientRepository: CreatePatientRepository,
  ) {}

  async create(
    model: CreatePatientsService.Model,
  ): Promise<CreatePatientsService.Response> {
    return await this.createPatientRepository.create(model)
  }
}

export namespace CreatePatientsService {
  export type Model = CreatePatients.Model
  export type Response = PatientEntity
}
